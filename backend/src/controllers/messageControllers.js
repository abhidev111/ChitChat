const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = expressAsyncHandler(async (req, res) => {
    
    const { content , chatId } = req.body;
    
    if (!content || !chatId) {
        console.log("Invalid data passed..!")
        res.status(400).send("Invalid data passed..!");
    }

    var newMessage = {
        sender : req.user._id,
        content: content,
        chat : chatId
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "name pic interests");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select :"name pic email interests"
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
          latestMessage : message   //// check with just content
        });

        res.status(200).json(message)
    } catch (error) {
        res.status(400); //.send({"error" : error})
        throw new Error(error.message)
    }
})



const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  sendMessage,
  allMessages,
};