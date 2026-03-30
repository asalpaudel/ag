import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    requestTopUp(body: {
        gameId: string;
        paymentMethodId: string;
        amount: number;
    }, req: any): Promise<{
        game: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            imageUrl: string | null;
            downloadLink: string | null;
            isActive: boolean;
            sortOrder: number;
        };
        paymentMethod: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            sortOrder: number;
            qrImageUrl: string | null;
            paymentTag: string | null;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gameId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
    }>;
    requestWithdraw(body: {
        paymentMethodId: string;
        payoutTag: string;
        amount: number;
    }, req: any): Promise<{
        paymentMethod: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            sortOrder: number;
            qrImageUrl: string | null;
            paymentTag: string | null;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
        payoutTag: string;
        eligibilitySnapshot: string | null;
    }>;
    myTopUps(req: any): Promise<({
        game: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            imageUrl: string | null;
            downloadLink: string | null;
            isActive: boolean;
            sortOrder: number;
        };
        paymentMethod: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            sortOrder: number;
            qrImageUrl: string | null;
            paymentTag: string | null;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gameId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
    })[]>;
    myWithdraws(req: any): Promise<({
        paymentMethod: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            sortOrder: number;
            qrImageUrl: string | null;
            paymentTag: string | null;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
        payoutTag: string;
        eligibilitySnapshot: string | null;
    })[]>;
    getStats(): Promise<{
        pendingTopUps: number;
        pendingWithdraws: number;
        activePlayers: number;
    }>;
    getAllTopUps(): Promise<({
        user: {
            id: string;
            username: string;
            fullName: string;
        };
        game: {
            id: string;
            name: string;
        };
        paymentMethod: {
            id: string;
            name: string;
            paymentTag: string | null;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gameId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
    })[]>;
    getAllWithdraws(): Promise<({
        user: {
            id: string;
            username: string;
            fullName: string;
        };
        paymentMethod: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
        payoutTag: string;
        eligibilitySnapshot: string | null;
    })[]>;
    updateTopUp(id: string, body: {
        status: string;
    }, req: any): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        gameId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
    }>;
    updateWithdraw(id: string, body: {
        status: string;
    }, req: any): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        amount: number;
        processedBy: string | null;
        notes: string | null;
        paymentMethodId: string;
        payoutTag: string;
        eligibilitySnapshot: string | null;
    }>;
}
