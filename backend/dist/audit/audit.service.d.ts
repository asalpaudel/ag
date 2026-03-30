import { PrismaService } from '../prisma/prisma.service';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    logAction(actorUserId: string, actorRole: string, actionType: string, targetType: string, targetId: string, description: string, oldValueJson?: any, newValueJson?: any): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        actorUserId: string;
        actorRole: string;
        actionType: string;
        targetType: string;
        targetId: string;
        oldValueJson: string | null;
        newValueJson: string | null;
    }>;
    getLogs(): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        actorUserId: string;
        actorRole: string;
        actionType: string;
        targetType: string;
        targetId: string;
        oldValueJson: string | null;
        newValueJson: string | null;
    }[]>;
}
