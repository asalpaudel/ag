import { Server } from 'socket.io';
export declare class EventsGateway {
    server: Server;
    emitNewTopUpOrder(order: any): void;
    emitNewWithdrawOrder(order: any): void;
    emitOrderStatusUpdate(orderId: string, status: string): void;
}
