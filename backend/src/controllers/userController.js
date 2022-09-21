const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, interests } = req.body;
  

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = await User.create({
    name,
    email,
    interests,
    password: hashedPassword,
    pic
  });

  // console.log(newUser)

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      interests: newUser.interests,
      pic: newUser.pic,
      token: generateToken(newUser._id),
      message: "you have successfuly registered",
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (user && validPassword) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      interests :user.interests,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(403).send("Wrong Password or user not found");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  //{{URL}}api/user?search=abhishek&lastname=devadiga
  
  const keyword = req.query.search
    ? {
        //either the search should match with name or email
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          {
            interests: {
              $elemMatch: { $regex: req.query.search, $options: "i" },
            },
          },
        ],
      }
    : {}; //ternary operator

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user.id } })
    .select("-password");
  // console.log(keyword);
  res.status(201).send(users);
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
};
