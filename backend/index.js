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

app.listen(process.env.PORT || 8000, () => {
  console.log("Express server is up and running");
});
