import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async findAllActive() {
        return this.prisma.paymentMethod.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
    }

    async findAllAdmin() {
        return this.prisma.paymentMethod.findMany({
            orderBy: { sortOrder: 'asc' },
        });
    }

    async createMethod(data: any) {
        return this.prisma.paymentMethod.create({ data });
    }

    async updateMethod(id: string, data: any) {
        return this.prisma.paymentMethod.update({ where: { id }, data });
    }
}
