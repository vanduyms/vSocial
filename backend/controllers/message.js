const Conversation = require("../models/conversationModel")
const Message = require("../models/messageModel");

const messageCtrl = {
  createMessage: async (req, res) => {
    try {
      const { sender, recipient, text, media, call } = req.body;
      if (!recipient || (!text.trim() && media.length === 0 && !call)) return;

      const newConversation = await Conversation.findOneAndUpdate({
        $or: [
          { recipients: [sender, recipient] },
          { recipients: [recipient, sender] }
        ]
      }, {
        recipients: [sender, recipient],
        text, media, call
      }, { new: true, upsert: true });

      const newMessage = new Message({
        conversation: newConversation._id,
        sender,
        recipient,
        text, media, call
      });

      const message = await newMessage.save();

      res.json({ msg: 'Create Success!', message })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getConversations: async (req, res) => {
    try {
      const perPage = parseInt(req.query.limit || 12);
      const page = parseInt(req.query.page || 1);

      const query = Conversation.find({
        recipients: req.user._id
      });

      const conversations = await query.sort('-updatedAt')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .populate('recipients', 'avatar username fullName');
      // const conversations = await Conversation.find({ recipients: req.user._id }).sort('-updatedAt').populate('recipients', 'avatar username fullName');

      res.json({
        conversations,
        result: conversations.length
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getMessages: async (req, res) => {
    try {
      const perPage = parseInt(req.query.limit || 20);
      const page = parseInt(req.query.page || 1);

      const query = Message.find({
        $or: [
          { sender: req.user._id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user._id }
        ]
      });

      const messages = await query.sort('-createdAt').skip((perPage * page) - perPage).limit(perPage);

      // const messages = await Message.find({
      //   $or: [
      //     { sender: req.user._id, recipient: req.params.id },
      //     { sender: req.params.id, recipient: req.user._id }
      //   ]
      // }).sort('-createdAt')

      res.json({
        messages,
        result: messages.length
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteConversation: async (req, res) => {
    try {
      const conversation = await Conversation.findOneAndDelete({
        $or: [
          { recipients: [req.user._id, req.params.id] },
          { recipients: [req.params._id, req.user._id] }
        ]
      });

      await Message.deleteMany({
        conversation: conversation._id
      });

      res.json({ msg: "Delete success" })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      await Message.findOneAndDelete({ _id: req.params.id, sender: req.user._id });
      res.json({ msg: "Delete success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = messageCtrl;