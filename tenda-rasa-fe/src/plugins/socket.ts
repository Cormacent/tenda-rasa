import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_WEBSOCKET);

socket.on("connect", () => {
    console.log("Connected to socket:", socket.id);
});