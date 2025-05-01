import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, this is a simple message from the server!');
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-box-app-imqn.vercel.app", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on port 3000");
});
