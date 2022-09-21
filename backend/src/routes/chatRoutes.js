const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const Router = express.Router();
const { accessChat, fetchChats } = require("../controllers/chatController");

Router.route("/").post(protect, accessChat);
Router.route("/").get(protect, fetchChats); //get all chats for that particular user
// Router.route("/group").post(protect, createGroupChat);
// Router.route("/rename").put(protect, renameGroupChat);
// Router.route("/groupRemove").put(protect, removeFromGroup);
// Router.route("/groupAdd").put(protect, addToGroup);

module.exports = Router;
