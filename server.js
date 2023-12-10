import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methodS: ["GET", "POST"]
    }
})

// socket events
io.on('connection', (socket) => {
    console.log("Connection is establish");

    socket.on("disconnect", () => {
        console.log("Connection is disconnected");
    })
})

server.listen(3000, () => {
  console.log("App is listening on 3000");
});
