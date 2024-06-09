const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const User = require ('./models/User');
const Conversation = require ('./models/Conversation');
const Messages = require ('./models/Message');

app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/levelfive", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('set recipient', (recipientId) => {
    socket.join(recipientId);
  });


  // socket.on('join conversation', (conversationId) => {
  //   socket.join(conversationId);
  //   console.log(`User joined conversation ${conversationId}`);
  // });

  
  // socket.on('join conversation', async (msg) => {
  //   const {conversationId, sender, recipient } = msg;
  //   let convId = conversationId;
  //   if (!convId) {
  //     // ابحث عن محادثة بين المرسل والمستقبل
  //     let conversation = await Conversation.findOne({
  //       participants: { $all: [sender, recipient] }
  //     });
  //     convId = conversation ? conversation._id : null;
  //   }
    
  //   if (convId) {
  //     socket.join(convId);
  //     console.log(`User joined conversation ${convId}`);
  //   } else {
  //     console.log(`Conversation not found between sender ${sender} and recipient ${recipient}`);
  //   }
  // });

  socket.on('join all conversations', async (userId) => {
    try {
      const conversations = await Conversation.find({ participants: userId });
      conversations.forEach(conversation => {
        socket.join(conversation._id.toString());
        console.log(`User joined conversation ${conversation._id.toString()}`);
      });
    } catch (err) {
      console.error('Error joining conversations:', err);
    }
  });

  socket.on('chat message', async (msg) => {
    const {conversationId, sender, recipient, text } = msg;
console.log(conversationId);
try {
  // Fetch the recipient's name and image URL from the User model
  const recipientUser = await User.findById(recipient);
  const senderUser = await User.findById(sender);
  let convId = conversationId;
  
  // تحقق من وجود conversationId
  if (!convId) {
    // ابحث عن محادثة بين المرسل والمستقبل
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, recipient] }
    });
    convId = conversation._id;
  }
  console.log(convId);
  const conversation = await Conversation.findById(convId);
  var newMessage;
  if (conversation) {
       // Save the message to the database
      newMessage = new Messages({
        conversationId:convId,
        sender,
        recipient,
        text,
      });
      conversation.senderNeme=recipient.name;
      await newMessage.save();
      await conversation.save();
    } else {
      const newConversation = new Conversation({
        participants: [sender, recipient],
        lastMessage: {
          text: text,
          createdAt: Date.now,
          sender: sender
        },
        senderNeme:senderUser.name,
        senderImage:senderUser.image,
        
      });
      newMessage = new Messages({
        conversationId:newConversation._id,
        sender,
        recipient,
        text,
      });
      await newMessage.save();
      await newConversation.save();
    }
     

      // Update the last message in the conversation document
      await Conversation.findByIdAndUpdate(convId, {
        $set: {
          'lastMessage.text': text,
          'lastMessage.createdAt': newMessage.createdAt,
          'lastMessage.sender': sender
        }
      });

  
      // Emit the message to all connected clients
      io.to(convId).emit('chat message', {
        _id: newMessage._id,
        conversationId: newMessage.conversationId,
        sender: newMessage.sender,
        senderName: senderUser.username,
        senderImageUrl: senderUser.imageUrl,
        recipient: newMessage.recipient,
        recipientName: recipientUser.username,
        recipientImageUrl: recipientUser.imageUrl,
        text: newMessage.text,
        createdAt: newMessage.createdAt
      });

      
      socket.emit('message sent', newMessage);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('conversations', async (userId) => {
    console.log(userId);
    try {
        // const userIdStr = userId.toString();

        const conversations = await Conversation.find({ participants: userId })
            .populate('participants', 'name image')
            .populate('lastMessage.sender', 'name image')
            .sort({ 'lastMessage.createdAt': -1 });

        const formattedConversations = conversations.map(conversation => formatConversation(conversation, userId));
        socket.emit('conversations', formattedConversations);
    } catch (err) {
        console.error(err);
        socket.emit('error', 'Failed to load conversations');
    }
});

function formatConversation(conversation, userId) {
    const otherParticipant = conversation.participants.find(
        (participant) => participant._id.toString() !== userId
    );

    return {
        _id: conversation._id,
        participants: conversation.participants,
        lastMessage: {
            text: conversation.lastMessage.text,
            image: conversation.lastMessage.image,
            createdAt: conversation.lastMessage.createdAt,
            senderName: conversation.lastMessage.sender.name,
            senderImageUrl: conversation.lastMessage.sender.image,
            recipientName: otherParticipant.name,
            recipientImageUrl: otherParticipant.image
        },
        senderNeme:conversation.senderNeme,
        senderImage:conversation.senderImage,
        otherParticipantID:otherParticipant._id,

    };
}
  // Fetch all messages between two users
  // socket.on('fetch messages', async (params) => {
  //   const { conversationId } = params;
  
  //   try {
  //     const messages = await Messages.find({
  //       conversationId: conversationId
  //     })
  //     .populate('sender', 'username imageUrl')
  //     .populate('recipient', 'username imageUrl')
  //     .sort({ createdAt: 1 });
  
  //     socket.emit('messages', messages.map(message => ({
  //       _id: message._id,
  //       sender: message.sender,
  //       senderName: message.sender.username,
  //       senderImageUrl: message.sender.imageUrl,
  //       recipient: message.recipient,
  //       recipientName: message.recipient.username,
  //       recipientImageUrl: message.recipient.imageUrl,
  //       text: message.text,
  //       image: message.image,
  //       createdAt: message.createdAt
  //     })));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  socket.on('fetch messages', async (msg) => {
    const { conversationId, senderId, recipientId } = msg;
  
    try {
      let convId = conversationId;
  
      // تحقق من وجود conversationId
      if (!convId) {
        // ابحث عن محادثة بين المرسل والمستقبل
        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, recipientId] }
        });
  
        if (!conversation) {
          // إذا لم توجد محادثة، أنشئ واحدة جديدة
          conversation = new Conversation({
            participants: [senderId, recipientId],
            createdAt: Date.now
          });
          await conversation.save();
        }
  
        convId = conversation._id;
      }
  console.log(convId.toString());
      // استرجاع الرسائل
      const messages = await Messages.find({
        conversationId: convId.toString()
      })
      .populate('sender', 'name image')
      .populate('recipient', 'name image')
      .sort({ createdAt: 1 });
  
      socket.emit('fetch messages', messages.map(message => (
        {
        _id: message._id,
        sender: message.sender._id,
        senderName: message.sender.name,
        senderImageUrl: message.sender.image,
        recipient: message.recipient._id,
        recipientName: message.recipient.name,
        recipientImageUrl: message.recipient.image,
        text: message.text,
        image: message.image,
        createdAt: message.createdAt
      }
    )));
    } catch (err) {
      console.error(err);
    }
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});