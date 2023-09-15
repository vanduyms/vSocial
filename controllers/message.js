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

      await newMessage.save()

      res.json({ msg: 'Create Success!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}