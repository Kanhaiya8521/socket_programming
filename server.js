import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methodS: ["GET", "POST"],
  },
});

// Use cors middleware
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const htmlPath = path.join(__dirname, "client.html");
console.log(htmlPath);

app.get("/", (req, res) => {
  res.sendFile(htmlPath);
});

// socket events
io.on("connection", (socket) => {
  console.log("Connection is establish");

  socket.on("join", (data) => {
    socket.username = data;
  });
  socket.on("new_message", (message) => {
    let userMessage = {
      username: socket.username,
      message: message,
    };
    //broadcast this message to all the clients.
    socket.broadcast.emit("broadcast_message", userMessage);
  });

  socket.on("disconnect", () => {
    console.log("Connection is disconnected");
  });
});

server.listen(3000, () => {
  console.log("App is listening on 3000");
});
