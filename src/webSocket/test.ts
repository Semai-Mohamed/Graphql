// client.js
import { io } from "socket.io-client";

// اتصال بالـ WebSocket namespace في NestJS
const socket = io("http://localhost:3001/freelance-chat");

// عند الاتصال
socket.on("connect", () => {
  console.log("Connected with id:", socket.id);

  // الانضمام لغرفة Freelancer1
  socket.emit("joinRoom", "freelancer1");

  // إرسال رسالة إلى Freelancer1
  socket.emit("sendMessage", { from: "client1", to: "freelancer1", message: "مرحبا!" });
});

// استقبال الرسائل من السيرفر
socket.on("receiveMessage", (data) => {
  console.log("Received:", data);
});

// عند فصل الاتصال
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
