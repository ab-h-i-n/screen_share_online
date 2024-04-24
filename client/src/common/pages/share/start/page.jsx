import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { IoMdShare } from "react-icons/io";
import { io } from "socket.io-client";
import uuid from "react-uuid";
import { SocketContext } from "../../../../utils/Context";

const Page = () => {
  const [roomId, setRoomId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const { setSocket } = useContext(SocketContext);
  const [videoStream, setVideoStream] = useState(null);

  const captureScreen = (socket, roomId) => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");
    const ctx = canvas.getContext("2d");

    const constraints = {
      video: {
        cursor: "always",
        displaySurface: "window",
        logicalSurface: true,
        frameRate: 10,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    navigator.mediaDevices
      .getDisplayMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        setVideoStream(stream);
        video.play();

        // Capture frames and send to server
        setInterval(() => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL("image/jpeg");
          socket.emit("stream-frame", { roomId, frameData: imageData });
        }, 10); // Adjust interval as needed
      })
      .catch((error) => {
        console.error("Error capturing screen:", error);
      });
  };

  useEffect(() => {
    const socket = io(API_URL);
    setSocket(socket);
    const roomId = uuid();
    setRoomId(roomId);
    socket.on("connect", () => {
      console.log("connected to server");
      socket.emit("join-message", roomId);
      captureScreen(socket, roomId);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-rows-[min-content,1fr,min-content]">
      {/* share id */}
      <div className="bg-violet-600 p-3 px-5 font-medium text-white flex justify-between items-center">
        <span>
          <span>Your Room ID : </span>
          <span>{roomId}</span>
        </span>
        <button>
          <IoMdShare size={20} />
        </button>
      </div>
      {/* video container */}
      <div>
        {videoStream && (
          <video
            className="w-full h-full"
            ref={(videoRef) => (videoRef.srcObject = videoStream)}
            autoPlay
          />
        )}
      </div>
      {/* number of members joined */}
      <div className="bg-green-600 p-3 font-medium text-white">
        <span>Members Joined : </span>
        <span>32</span>
      </div>
      {/* leave room */}
      <div className="fixed top-7 right-5">
        <Button bgColor={"bg-red-600"}>X</Button>
      </div>
    </div>
  );
};

export default Page;