import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getActiveMethods(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        sortOrder: number;
        qrImageUrl: string | null;
        paymentTag: string | null;
    }[]>;
    getAllAdmin(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        sortOrder: number;
        qrImageUrl: string | null;
        paymentTag: string | null;
    }[]>;
    createMethod(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        sortOrder: number;
        qrImageUrl: string | null;
        paymentTag: string | null;
    }>;
    updateMethod(id: string, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        sortOrder: number;
        qrImageUrl: string | null;
        paymentTag: string | null;
    }>;
}
