const express = require("express");
const app = express();


const { routeNotFound, errorHandler } = require("./src/middlewares/errorHandlers");
require("dotenv").config();
require("./db");
var cors = require("cors");
app.use(cors());
const userRoutes = require("./src/routes/userRoute");
const chatRoutes = require("./src/routes/chatRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
app.use(express.json());
app.get("/", (req, res) => {
  console.log(req);
  res.send("Yo bro im working");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(routeNotFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Express server is up and running");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:4200",
  },
});

io.on("connection", (socket) => {
  console.log("Hurrayy..");
  //console.log(socket);
  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log("user joined with user Id : " + userId)
    socket.emit("connected")
  });

  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("user joined with room Id : " + room);
  })

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log('chat.users not defined !!');
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved)
    });
  });

  socket.off("setup", () => {
    console.log("USER_DISCONNECTED FROM SOCKET");
    socket.leave(userId);
  })
});