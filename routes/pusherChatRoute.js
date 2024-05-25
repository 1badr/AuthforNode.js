const express = require('express');
const Pusher = require('pusher');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();

router.get("/api", (req, res) => {
res.send("API is running");
});

const pusher = new Pusher({
appId: "1807927",
key: "7200f059fc4173f84f3c",
secret: "5079fb35e04a6f5543dc",
cluster: "eu",
useTLS: true
});

const ChatMessage = mongoose.model('ChatMessage', {
text: String,
sender: String,
conversation_id: String,
timestamp: { type: Date, default: Date.now }
});

router.post('/messages', async (req, res) => {
    try {
      const { text, sender, conversation_id } = req.body;
  
      if (!text || !sender || !conversation_id) {
        return res.status(400).send('يرجى إرسال جميع الحقول المطلوبة.');
      }
  
      const newMessage = new ChatMessage({ text, sender, conversation_id });
      await newMessage.save();
  
      pusher.trigger(`conversation-${conversation_id}`, 'new-message', {
        text,
        sender,
        timestamp: newMessage.timestamp
      });
  
      res.status(201).send(newMessage);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(err.message);
      }
  
      if (err.message && err.message.includes('Pusher error')) {
        return res.status(500).send('حدث خطأ في إرسال الرسالة إلى Pusher.');
      }
  
      console.error(err);
      res.status(500).send('حدث خطأ داخلي.');
    }
  });

router.get('/messages/:conversation_id', async (req, res) => {
try {
const { conversation_id } = req.params;
const messages = await ChatMessage.find({ conversation_id }).sort({ timestamp: 1 });
res.status(200).send(messages);
} catch (err) {
res.status(500).send(err);
}
});

module.exports = router;