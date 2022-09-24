const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    interests: { type: Array, default: [] },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    }, //https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
