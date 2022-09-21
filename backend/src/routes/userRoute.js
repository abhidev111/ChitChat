const express = require("express");
const Router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// Router.post('/', registerUser);
// Router.get("/", allUsers);

Router.route("/").post(registerUser).get(protect, allUsers);

Router.post("/login", authUser);

module.exports = Router;
