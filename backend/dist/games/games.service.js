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
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const encryption_service_1 = require("../encryption/encryption.service");
let GamesService = class GamesService {
    prisma;
    encryption;
    constructor(prisma, encryption) {
        this.prisma = prisma;
        this.encryption = encryption;
    }
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
    async createGame(data) {
        return this.prisma.game.create({ data });
    }
    async updateGame(id, data) {
        return this.prisma.game.update({ where: { id }, data });
    }
    async assignCredential(userId, gameId, username, plainTextPassword, assignedBy) {
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
    async getUserCredentials(userId, gameId) {
        const creds = await this.prisma.userGameCredential.findMany({
            where: { userId, gameId }
        });
        return creds.map(c => ({
            ...c,
            gamePasswordPlain: this.encryption.decrypt(c.gamePasswordEncrypted)
        }));
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService])
], GamesService);
//# sourceMappingURL=games.service.js.map