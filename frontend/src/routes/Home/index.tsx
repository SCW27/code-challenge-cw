import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import UserItem from "./components/UserItem";

interface userInfo {
  name: string;
}

const Home = () => {
  const [socket, setSocket] = useState<Socket>();
  const [users, setUsers] = useState<userInfo[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const s = io("http://localhost:3001", {});
    setSocket(s);

    s.on("user_list_update", (data) => {
      const nusers = data.filter((user) => {
        // console.log(name);
        // console.log(user.name);
        if (user.name.toString() !== name.toString()) {
          return user;
        }
        return;
      });
      console.log(nusers);
      setUsers(nusers);
    });
  }, []);

  // FUNCTION
  const getUsers = () => {
    if (socket) {
      socket.emit("get_users");
    }
  };
  // FUNCTION

  return (
    <div className="container">
      <div className="list-group">
        {users ? (
          users.map((user, index) => {
            return <UserItem key={index} user={user} />;
          })
        ) : (
          <></>
        )}
      </div>
      <div className="mb-3">
        <br />
        <label htmlFor="name" className="form-label">
          Enter name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="John..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />

        <button
          className="btn btn-success"
          onClick={() => {
            if (socket) {
              socket.emit("join_chat", {
                room: name
              });
              getUsers();
            }
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Home;
