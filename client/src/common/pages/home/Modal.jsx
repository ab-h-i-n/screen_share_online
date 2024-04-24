import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();

  const joinShare = (e) => {
    e.preventDefault();
    const roomId = e.target.roomId.value;
    navigate(`/room/join?roomId=${roomId}`);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className={`${
        isOpen ? "fixed" : "hidden"
      } w-screen h-screen top-0 z-50 backdrop-blur-md`}
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => joinShare(e)}
        className="bg-slate-800 grid gap-5 rounded w-[80%] px-5 py-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <input
          type="text"
          placeholder="Enter Room ID"
          className="w-full p-3 rounded"
          name="roomId"
        />
        <button className="w-full p-3 bg-green-600 text-white rounded">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Modal;
