import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<{
        id: string;
        username: string;
        email: string | null;
        phone: string | null;
        role: string;
        fullName: string;
        passwordHash: string;
        profileImageUrl: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        username: string;
        email: string | null;
        phone: string | null;
        role: string;
        fullName: string;
        passwordHash: string;
        profileImageUrl: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: any): Promise<{
        id: string;
        username: string;
        email: string | null;
        phone: string | null;
        role: string;
        fullName: string;
        passwordHash: string;
        profileImageUrl: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
