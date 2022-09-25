const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded1");
      // console.log(decoded);
      // console.log("decoded1");
      req.user = await User.findById(decoded.id).select("-password"); //userdata without password
      // console.log("decoded2");
      // console.log(req.user);
      // console.log("decoded2");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised no token");
    }
  }
  else {
    throw new Error("Token not found");
  }
});

module.exports = { protect };
