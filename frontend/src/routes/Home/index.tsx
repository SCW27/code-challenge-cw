import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 } from "uuid";

const Home = () => {
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket>();
  const [chats, setChats] = useState<{ id: string; message: string }[]>([]);
  const [id, setId] = useState<string>(v4());
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    const s = io("http://localhost:3001", {});
    setSocket(s);

    s.on("send_chat", (data) => {
      console.log([...chats, data]);
      setChats([...chats, data]);
    });
  }, []);

  return (
    <div className="container">
      <div className="list-group">
        <a
          href="#"
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
          aria-current="true"
        >
          <img
            src="https://github.com/twbs.png"
            alt="twbs"
            width="32"
            height="32"
            className="rounded-circle flex-shrink-0"
          />
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">List group item heading</h6>
              <p className="mb-0 opacity-75">
                Some placeholder content in a paragraph.
              </p>
            </div>
            <small className="opacity-50 text-nowrap">now</small>
          </div>
        </a>
      </div>
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
          <button
            type="submit"
            className="btn btn-danger mb-3"
            onClick={() => {
              if (socket) {
                socket.emit("join_chat", { id, room });
              }
            }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
