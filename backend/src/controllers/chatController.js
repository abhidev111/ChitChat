const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");




const accessChat = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(404).send("UserId missing in body"); // return res.sendStatus(400);
  }

  
  console.log(req.user._id);

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, // change in case of error req.user._id
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.status(200).send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
      latestMessage:"",
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});


const fetchChats = asyncHandler(async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      //.populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email interests",
        });
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
        throw new Error(error.message);
      });
  } catch (error) {
    // console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});


module.exports = { accessChat, fetchChats };
