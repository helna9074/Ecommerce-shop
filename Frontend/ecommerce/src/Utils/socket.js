import { io } from "socket.io-client";

let socket;

if (!socket) {
  socket = io("https://ecommerce-shop-kzde.onrender.com", {
    autoConnect: false,
  });
}

export default socket;
