const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

//sfsdf
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat2-kappa.vercel.app/",
    methods: ["GET", "POST"],
  },
});
//fdfsdfs
io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);
  //این قسمت از سمت فرانت ارسال میشود. data
  //متد joinRoom
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID:${socket.id} joined the room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running");
});
