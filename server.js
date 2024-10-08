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



mongoose.connect("mongodb://localhost:27017/levelfive", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('set recipient', (recipientId) => {
    socket.join(recipientId);
  });

  socket.on('chat message', async (msg) => {
    const { conversationId, sender, recipient, text } = msg;

    try {
      const newMessage = new Messages({
        conversationId,
        sender,
        recipient,
        text,
      });
      await newMessage.save();

      await Conversation.findByIdAndUpdate(conversationId, {
        $set: {
          'lastMessage.text': text,
          'lastMessage.createdAt': newMessage.createdAt,
          'lastMessage.sender': sender
        }
      });

      const recipientUser = await User.findById(recipient, { username: 1, imageUrl: 1 });

      io.emit('chat message', {
        _id: newMessage._id,
        conversationId: newMessage.conversationId,
        sender: newMessage.sender,
        senderName: (await User.findById(sender, { username: 1 })).username,
        senderImageUrl: (await User.findById(sender, { imageUrl: 1 })).imageUrl,
        recipient: newMessage.recipient,
        recipientName: recipientUser.username,
        recipientImageUrl: recipientUser.imageUrl,
        text: newMessage.text,
        createdAt: newMessage.createdAt
      });
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('fetch conversations', async (userId) => {
    try {
      const conversations = await Conversation.find({ participants: userId })
        .populate('participants', 'username imageUrl')
        .populate('lastMessage.sender', 'username imageUrl')
        .sort({ 'lastMessage.createdAt': -1 });
  
      socket.emit('conversations', conversations.map(conversation => {
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
            senderName: conversation.lastMessage.sender.username,
            senderImageUrl: conversation.lastMessage.sender.imageUrl,
            recipientName: otherParticipant.username,
            recipientImageUrl: otherParticipant.imageUrl
          }
        };
      }));
    } catch (err) {
      console.error(err);
    }
  });  

  socket.on('fetch messages', async (params) => {
    const { conversationId } = params;
  
    try {
      const messages = await Messages.find({
        conversationId: conversationId
      })
      .populate('sender', 'username imageUrl')
      .populate('recipient', 'username imageUrl')
      .sort({ createdAt: 1 });
  
      socket.emit('messages', messages.map(message => ({
        _id: message._id,
        sender: message.sender,
        senderName: message.sender.username,
        senderImageUrl: message.sender.imageUrl,
        recipient: message.recipient,
        recipientName: message.recipient.username,
        recipientImageUrl: message.recipient.imageUrl,
        text: message.text,
        image: message.image,
        createdAt: message.createdAt
      })));
    } catch (err) {
      console.error(err);
    }
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
