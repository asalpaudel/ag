import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    emitNewTopUpOrder(order: any) {
        this.server.emit('newTopUp', order);
    }

    emitNewWithdrawOrder(order: any) {
        this.server.emit('newWithdraw', order);
    }

    emitOrderStatusUpdate(orderId: string, status: string) {
        this.server.emit('orderStatusUpdated', { orderId, status });
    }
}
