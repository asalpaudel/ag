import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) { }

    async logAction(actorUserId: string, actorRole: string, actionType: string, targetType: string, targetId: string, description: string, oldValueJson?: any, newValueJson?: any) {
        return this.prisma.auditLog.create({
            data: {
                actorUserId,
                actorRole,
                actionType,
                targetType,
                targetId,
                description,
                oldValueJson: oldValueJson ? JSON.stringify(oldValueJson) : null,
                newValueJson: newValueJson ? JSON.stringify(newValueJson) : null,
            },
        });
    }

    async getLogs() {
        return this.prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
    }
}
