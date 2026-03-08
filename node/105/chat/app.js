import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("got a connection");

  /*setInterval(() => {
    socket.emit('msg', 'hello from server');
  }, 1000);*/
  socket.on("login", (name) => {
    //console.log(`${name} just joined at`, new Date());
    socket.name = name;
    socket.broadcast.emit("msg", `${name} has joined the chat`);
  });

  socket.on("msg", (msg) => {
    //socket.broadcast.emit('msg', msg);
    io.emit("msg", `${socket.name}: ${msg}`);
  });

  socket.on('disconect', () =>{
    io.emit('msg', `${socket.name} has left the chat`);
  });
});

server.listen(80);
