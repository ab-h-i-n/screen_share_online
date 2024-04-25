import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { SocketContext } from "../../../../utils/Context";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const Page = () => {
  const [img, setImg] = useState("");
  const roomId = useLocation().search.split("=")[1];
  const API_URL = import.meta.env.VITE_API_URL;
  const { socket } = useContext(SocketContext);
  var newSocket;

  useEffect(() => {
    if (!newSocket) {
      newSocket = io(API_URL);
      newSocket.on("connect", () => {
        console.log("connected to server");
        newSocket.emit("join-message", roomId);
      });
      newSocket.on("stream-frame", (frameData) => {
        setImg(frameData);
      });
    }
  }, []);

  return (
    <div className="grid">
      {/* video container */}
      <div>
        {img && <img src={img} alt="video" />}
      </div>

      {/* leave room */}
      <div className="fixed top-7 right-5">
        <Button bgColor={"bg-red-600"}>X</Button>
      </div>
    </div>
  );
};

export default Page;
