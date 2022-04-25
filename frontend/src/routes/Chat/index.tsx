import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket>();
  const [chats, setChats] = useState<{ id: string; message: string }[]>([]);
  const [id, setId] = useState<string>(
    "wdawd" + Math.round(Math.random() * 100)
  );
  const [room, setRoom] = useState<string>("");

  const params = useParams();

  useEffect(() => {
    if (params && params.userId) {
      // SET USER ID
      setRoom(params.userId);

      // SETUP
      const s = io("http://localhost:3001", {});
      setSocket(s);

      // JOIN ROOM
      s?.emit("join_chat", { id, room: params.userId });

      s.on("send_chat", (data) => {
        console.log([...chats, data]);
        setChats([...chats, data]);
      });

      // s.on("user_online", (data) => {
      //   console.log(data);
      // });
    }
  }, [params]);

  return (
    <div className="container">
      <br />
      {chats ? (
        chats.map((item, key) => {
          return <div key={key}>{item.message}</div>;
        })
      ) : (
        <></>
      )}
      <br />
      <div className="row g-3 mt-4">
        <div className="col-auto">
          <label htmlFor="inputPassword2" className=""></label>
          <input
            type="text"
            className="form-control"
            id="inputPassword2"
            placeholder="Chat"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <div className="col-auto">
          <label htmlFor="inputPassword2" className=""></label>
          <input
            type="text"
            className="form-control"
            id="inputPassword2"
            placeholder="Room"
            value={room}
            readOnly
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </div>

        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-3"
            onClick={() => {
              if (socket) {
                socket.emit("send_chat", { id, chat: message, room });
                setChats([...chats, { id, message: message }]);
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
