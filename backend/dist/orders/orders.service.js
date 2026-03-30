"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const events_gateway_1 = require("../events/events.gateway");
const audit_service_1 = require("../audit/audit.service");
let OrdersService = class OrdersService {
    prisma;
    events;
    audit;
    constructor(prisma, events, audit) {
        this.prisma = prisma;
        this.events = events;
        this.audit = audit;
    }
    generateOrderNumber(prefix) {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    async createTopUp(userId, gameId, paymentMethodId, amount) {
        const game = await this.prisma.game.findUnique({ where: { id: gameId } });
        if (!game || !game.isActive)
            throw new common_1.BadRequestException('Game is inactive or invalid');
        const payment = await this.prisma.paymentMethod.findUnique({ where: { id: paymentMethodId } });
        if (!payment || !payment.isActive)
            throw new common_1.BadRequestException('Payment method is inactive or invalid');
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
    async createWithdraw(userId, paymentMethodId, payoutTag, amount) {
        const minSetting = await this.prisma.settings.findUnique({ where: { key: 'WITHDRAW_MIN' } });
        const maxSetting = await this.prisma.settings.findUnique({ where: { key: 'WITHDRAW_MAX' } });
        const minAmount = minSetting ? parseFloat(minSetting.value) : 20;
        const maxAmount = maxSetting ? parseFloat(maxSetting.value) : 5000;
        if (amount < minAmount)
            throw new common_1.BadRequestException(`Amount below minimum: ${minAmount}`);
        if (amount > maxAmount)
            throw new common_1.BadRequestException(`Amount exceeds maximum: ${maxAmount}`);
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
    async getPlayerTopUps(userId) {
        return this.prisma.topUpOrder.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { game: true, paymentMethod: true },
        });
    }
    async getPlayerWithdraws(userId) {
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
    async updateTopUpStatus(id, status, processedBy) {
        const old = await this.prisma.topUpOrder.findUnique({ where: { id } });
        const updated = await this.prisma.topUpOrder.update({ where: { id }, data: { status, processedBy } });
        this.events.emitOrderStatusUpdate(id, status);
        await this.audit.logAction(processedBy, 'staff', 'TOP_UP_STATUS_UPDATE', 'TopUpOrder', id, `Status changed to ${status}`, { status: old?.status }, { status });
        return updated;
    }
    async updateWithdrawStatus(id, status, processedBy) {
        const old = await this.prisma.withdrawOrder.findUnique({ where: { id } });
        const updated = await this.prisma.withdrawOrder.update({ where: { id }, data: { status, processedBy } });
        this.events.emitOrderStatusUpdate(id, status);
        await this.audit.logAction(processedBy, 'staff', 'WITHDRAW_STATUS_UPDATE', 'WithdrawOrder', id, `Status changed to ${status}`, { status: old?.status }, { status });
        return updated;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        events_gateway_1.EventsGateway,
        audit_service_1.AuditService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map