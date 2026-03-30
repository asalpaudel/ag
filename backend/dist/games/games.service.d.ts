import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
export declare class GamesService {
    private prisma;
    private encryption;
    constructor(prisma: PrismaService, encryption: EncryptionService);
    findAllActive(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    findAllAdmin(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    createGame(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    updateGame(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    assignCredential(userId: string, gameId: string, username: string, plainTextPassword: string, assignedBy: string): Promise<{
        id: string;
        updatedAt: Date;
        gameUsername: string;
        gamePasswordEncrypted: string;
        assignedBy: string | null;
        assignedAt: Date;
        userId: string;
        gameId: string;
    }>;
    getUserCredentials(userId: string, gameId: string): Promise<{
        gamePasswordPlain: string;
        id: string;
        updatedAt: Date;
        gameUsername: string;
        gamePasswordEncrypted: string;
        assignedBy: string | null;
        assignedAt: Date;
        userId: string;
        gameId: string;
    }[]>;
}
