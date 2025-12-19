import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("new client connected:", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("handshake userId:", userId);

  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);

    if (userId) {
      delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
    }
  });
});

export { app, io, server };
