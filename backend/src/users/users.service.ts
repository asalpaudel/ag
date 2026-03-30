import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findByUsername(username: string) {
        return this.prisma.user.findUnique({ where: { username } });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(data: any) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({
            data: {
                username: data.username,
                fullName: data.fullName,
                passwordHash,
                role: data.role || 'player',
            },
        });
    }
}
