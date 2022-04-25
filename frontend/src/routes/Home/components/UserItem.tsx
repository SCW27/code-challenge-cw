import React from "react";
import { useNavigate } from "react-router-dom";

interface userInterface {
  name: string;
}

const UserItem = ({ user }) => {
  const navigate = useNavigate();

  return (
    <a
      href="#"
      className="list-group-item list-group-item-action d-flex gap-3 py-3"
      aria-current="true"
      onClick={() => {
        navigate(`/chat/${user._id}`);
      }}
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
          <p className="mb-0 opacity-75">{user?.name}</p>
        </div>
        <small className="opacity-50 text-nowrap">now</small>
      </div>
    </a>
  );
};

export default UserItem;
