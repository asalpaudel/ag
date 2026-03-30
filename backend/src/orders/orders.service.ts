import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private events: EventsGateway,
        private audit: AuditService,
    ) { }

    private generateOrderNumber(prefix: string): string {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    async createTopUp(userId: string, gameId: string, paymentMethodId: string, amount: number) {
        const game = await this.prisma.game.findUnique({ where: { id: gameId } });
        if (!game || !game.isActive) throw new BadRequestException('Game is inactive or invalid');

        const payment = await this.prisma.paymentMethod.findUnique({ where: { id: paymentMethodId } });
        if (!payment || !payment.isActive) throw new BadRequestException('Payment method is inactive or invalid');

        const order = await this.prisma.topUpOrder.create({
            data: {
                orderNumber: this.generateOrderNumber('TOP'),
                userId,
                gameId,
                paymentMethodId,
                amount,
                status: 'Processing',
            },
            include: { game: true, paymentMethod: true },
        });

        this.events.emitNewTopUpOrder(order);
        await this.audit.logAction(userId, 'player', 'TOP_UP_REQUEST', 'TopUpOrder', order.id, `Top-up of $${amount} for game ${game.name}`);

        return order;
    }

    async createWithdraw(userId: string, paymentMethodId: string, payoutTag: string, amount: number) {
        const minSetting = await this.prisma.settings.findUnique({ where: { key: 'WITHDRAW_MIN' } });
        const maxSetting = await this.prisma.settings.findUnique({ where: { key: 'WITHDRAW_MAX' } });

        const minAmount = minSetting ? parseFloat(minSetting.value) : 20;
        const maxAmount = maxSetting ? parseFloat(maxSetting.value) : 5000;

        if (amount < minAmount) throw new BadRequestException(`Amount below minimum: ${minAmount}`);
        if (amount > maxAmount) throw new BadRequestException(`Amount exceeds maximum: ${maxAmount}`);

        const order = await this.prisma.withdrawOrder.create({
            data: {
                orderNumber: this.generateOrderNumber('WTH'),
                userId,
                paymentMethodId,
                payoutTag,
                amount,
                status: 'Pending',
                eligibilitySnapshot: `Allowed limits: ${minAmount}-${maxAmount}`,
            },
            include: { paymentMethod: true },
        });

        this.events.emitNewWithdrawOrder(order);
        await this.audit.logAction(userId, 'player', 'WITHDRAW_REQUEST', 'WithdrawOrder', order.id, `Withdraw of $${amount} to ${payoutTag}`);

        return order;
    }

    async getPlayerTopUps(userId: string) {
        return this.prisma.topUpOrder.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { game: true, paymentMethod: true },
        });
    }

    async getPlayerWithdraws(userId: string) {
        return this.prisma.withdrawOrder.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { paymentMethod: true },
        });
    }

    async getAdminTopUps() {
        return this.prisma.topUpOrder.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, username: true, fullName: true } },
                game: { select: { id: true, name: true } },
                paymentMethod: { select: { id: true, name: true, paymentTag: true } },
            },
        });
    }

    async getAdminWithdraws() {
        return this.prisma.withdrawOrder.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, username: true, fullName: true } },
                paymentMethod: { select: { id: true, name: true } },
            },
        });
    }

    async getStats() {
        const [pendingTopUps, pendingWithdraws, activePlayers] = await Promise.all([
            this.prisma.topUpOrder.count({ where: { status: 'Processing' } }),
            this.prisma.withdrawOrder.count({ where: { status: 'Pending' } }),
            this.prisma.user.count({ where: { role: 'player', status: 'active' } }),
        ]);
        return { pendingTopUps, pendingWithdraws, activePlayers };
    }

    async updateTopUpStatus(id: string, status: string, processedBy: string) {
        const old = await this.prisma.topUpOrder.findUnique({ where: { id } });
        const updated = await this.prisma.topUpOrder.update({ where: { id }, data: { status, processedBy } });
        this.events.emitOrderStatusUpdate(id, status);
        await this.audit.logAction(processedBy, 'staff', 'TOP_UP_STATUS_UPDATE', 'TopUpOrder', id, `Status changed to ${status}`, { status: old?.status }, { status });
        return updated;
    }

    async updateWithdrawStatus(id: string, status: string, processedBy: string) {
        const old = await this.prisma.withdrawOrder.findUnique({ where: { id } });
        const updated = await this.prisma.withdrawOrder.update({ where: { id }, data: { status, processedBy } });
        this.events.emitOrderStatusUpdate(id, status);
        await this.audit.logAction(processedBy, 'staff', 'WITHDRAW_STATUS_UPDATE', 'WithdrawOrder', id, `Status changed to ${status}`, { status: old?.status }, { status });
        return updated;
    }
}
