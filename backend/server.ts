import express from "express";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import CONFIG from "./config";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();
const router = express.Router();

const httpServer = http.createServer(http);
const io = new IOServer(httpServer, { cors: { origin: "*" } });

app.use(router);
app.use(cors());

interface joinRoomInterface {
  id: string;
  room: string;
}

io.on("connection", (socket) => {
  // GET USERS
  socket.on("get_users", async () => {
    console.log("get_users");
    await User.find().then((res) => {
      console.log(res);
      socket.emit("user_list_update", res);
    });
  });
  // JOIN
  socket.on("join_chat", async (data: joinRoomInterface) => {
    console.log(data);
    try {
      let user = await User.findById(data.room);
      if (!user) {
        user = new User({ name: data.room });
        user.save();
      }
      socket.join(data.room);
      socket.broadcast.emit("user_online");
      console.log(`Joined ${data.id} - ${data.room}`);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("send_chat", (data) => {
    console.log(socket);
    console.log(`sending ${data.chat} from ${data.id} to room ${data.room}`);
    socket.to(data.room).emit("send_chat", { message: data.chat, id: data.id });
  });
});

const uri =
  "mongodb+srv://chatappuser:O8hxyZaaEkGttnvd@cluster0.8ee4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);
const db = mongoose.connection;

db.once("connected", () => {
  console.log("connected");
});

db.on("error", (error) => {
  console.log(error);
});

httpServer.listen(CONFIG.PORT, () => {
  console.log(`Server listening on *:${CONFIG.PORT} 🚀`);
});
