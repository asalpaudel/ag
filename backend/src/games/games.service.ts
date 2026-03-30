import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class GamesService {
    constructor(
        private prisma: PrismaService,
        private encryption: EncryptionService
    ) { }

    async findAllActive() {
        return this.prisma.game.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
    }

    async findAllAdmin() {
        return this.prisma.game.findMany({
            orderBy: { sortOrder: 'asc' },
        });
    }

    async createGame(data: any) {
        return this.prisma.game.create({ data });
    }

    async updateGame(id: string, data: any) {
        return this.prisma.game.update({ where: { id }, data });
    }

    // --- Credentials ---

    async assignCredential(userId: string, gameId: string, username: string, plainTextPassword: string, assignedBy: string) {
        const encryptedPassword = this.encryption.encrypt(plainTextPassword);
        return this.prisma.userGameCredential.create({
            data: {
                userId,
                gameId,
                gameUsername: username,
                gamePasswordEncrypted: encryptedPassword,
                assignedBy
            }
        });
    }

    async getUserCredentials(userId: string, gameId: string) {
        const creds = await this.prisma.userGameCredential.findMany({
            where: { userId, gameId }
        });

        // Decrypt passwords before returning to authorized user
        return creds.map(c => ({
            ...c,
            gamePasswordPlain: this.encryption.decrypt(c.gamePasswordEncrypted)
        }));
    }
}
