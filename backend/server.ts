import express from "express";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import CONFIG from "./config";

const app = express();
const router = express.Router();

const httpServer = http.createServer(http);
const io = new IOServer(httpServer, { cors: { origin: "*" } });

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  socket.on("join_chat", (data) => {
    socket.join(data.room);
    console.log(`Joined ${data.id} - ${data.room}`);
  });
  socket.on("send_chat", (data) => {
    console.log(socket);
    console.log(`sending ${data.chat} from ${data.id} to room ${data.room}`);
    socket.to(data.room).emit("send_chat", { message: data.chat, id: data.id });
  });
});

httpServer.listen(CONFIG.PORT, () => {
  console.log(`Server listening on *:${CONFIG.PORT} 🚀`);
});
