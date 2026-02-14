import { io } from "socket.io-client";

let socket;

if (!socket) {
  socket = io("http://localhost:5000", {
    autoConnect: true,
  });
}

export default socket;
