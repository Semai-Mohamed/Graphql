/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { namespace: 'freelance-chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // عند اتصال العميل
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // عند فصل العميل
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // استقبال رسالة من العميل
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() payload: { from: string; to: string; message: string }, @ConnectedSocket() client: Socket)  { // `Message from ${from} to ${to}: ${message}`
    const { from, to, message } = payload;

    // إرسال الرسالة للعميل الآخر فقط داخل الغرفة المحددة (لا تعيد للمرسل)
    client.to(to).emit('receiveMessage', { from, message });

    console.log(`Message from ${from} to ${to}: ${message}`);
  }

  // تسجيل العميل ضمن غرفة معينة (مثال: freelancer أو client)
  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
    console.log(client.rooms)
    console.log(`${client.id} joined room ${room}`);
  }
}