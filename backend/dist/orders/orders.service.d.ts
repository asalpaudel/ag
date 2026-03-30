import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import { AuditService } from '../audit/audit.service';
export declare class OrdersService {
    private prisma;
    private events;
    private audit;
    constructor(prisma: PrismaService, events: EventsGateway, audit: AuditService);
    private generateOrderNumber;
    createTopUp(userId: string, gameId: string, paymentMethodId: string, amount: number): Promise<{
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
    createWithdraw(userId: string, paymentMethodId: string, payoutTag: string, amount: number): Promise<{
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
    getPlayerTopUps(userId: string): Promise<({
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
    getPlayerWithdraws(userId: string): Promise<({
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
    getAdminTopUps(): Promise<({
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
    getAdminWithdraws(): Promise<({
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
    getStats(): Promise<{
        pendingTopUps: number;
        pendingWithdraws: number;
        activePlayers: number;
    }>;
    updateTopUpStatus(id: string, status: string, processedBy: string): Promise<{
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
    updateWithdrawStatus(id: string, status: string, processedBy: string): Promise<{
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
