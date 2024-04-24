module.exports = (io) => {
    const activeStreams = {};
  
    io.on("connection", (socket) => {
      console.log("connected to user", socket.id);
  
      socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("joined room", roomId);
      });
  
      socket.on("stream-frame", ({ roomId, frameData }) => {
        // Emit the frame data to all clients in the same room
        io.to(roomId).emit("stream-frame", frameData);
      });
    });
  };
  