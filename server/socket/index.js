module.exports = (io) => {
  const activeStreams = {};

  io.on("connection", (socket) => {
    console.log("connected to user", socket.id);

    socket.on("join-message", (roomId) => {
      socket.join(roomId);
      console.log("joined room", roomId);

      // Get the current number of members in the room
      const room = io.sockets.adapter.rooms.get(roomId);
      const numMembers = room ? room.size : 0;
      console.log("new member joined", numMembers - 1);

      // Emit the current number of members to the newly joined member
      socket.to(roomId).emit("set-member", numMembers - 1);
    });

    socket.on("stream-frame", ({ roomId, frameData }) => {
      // Emit the frame data to all clients in the same room
      socket.to(roomId).emit("stream-frame", frameData);
    });
  });
};
