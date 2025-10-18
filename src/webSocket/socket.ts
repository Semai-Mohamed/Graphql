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

/**
 Exception filters
The only difference between the HTTP exception filter layer and the corresponding web sockets layer is that instead of throwing HttpException, you should use WsException.



throw new WsException('Invalid credentials.');
 */

/**
 
@UsePipes(new ValidationPipe({ exceptionFactory: (errors) => new WsException(errors) }))
@SubscribeMessage('events')
handleEvent(client: Client, data: unknown): WsResponse<unknown> {
  const event = 'events';
  return { event, data };
}

 */

/**
 Binding guards#
The following example uses a method-scoped guard. Just as with HTTP based applications, you can also use gateway-scoped guards (i.e., prefix the gateway class with a @UseGuards() decorator).


JS

@UseGuards(AuthGuard)
@SubscribeMessage('events')
handleEvent(client: Client, data: unknown): WsResponse<unknown> {
  const event = 'events';
  return { event, data };
}
 */


/**
 Interceptors
There is no difference between regular interceptors and web sockets interceptors. The following example uses a manually instantiated method-scoped interceptor. Just as with HTTP based applications, you can also use gateway-scoped interceptors (i.e., prefix the gateway class with a @UseInterceptors() decorator).


JS

@UseInterceptors(new TransformInterceptor())
@SubscribeMessage('events')
handleEvent(client: Client, data: unknown): WsResponse<unknown> {
  const event = 'events';
  return { event, data };
}
 */