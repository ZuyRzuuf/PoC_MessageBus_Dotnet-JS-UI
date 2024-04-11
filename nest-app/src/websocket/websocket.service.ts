import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8082, {
  cors: { origin: 'http://localhost:3000' },
})
export class WebsocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {
    console.log('WebSocketGateway initialized');
  }

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]): any {
    console.log('Client connected:', client.id);
    console.log('Client args:', args);
    client.emit('nestMessage', 'Hello from NestJS backend!');
  }

  handleDisconnect(client: any): any {
    console.log('Client disconnected:', client.id);
  }

  emitMessage(event: string, message: string) {
    this.server.emit(event, message);
  }
}
