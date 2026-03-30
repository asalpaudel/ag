import { GamesService } from './games.service';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    getActiveGames(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    getAllGamesAdmin(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    createGame(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        imageUrl: string | null;
        downloadLink: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    getMyCredentials(gameId: string, req: any): Promise<{
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
    assignCredential(userId: string, body: {
        gameId: string;
        username: string;
        plainTextPassword: string;
    }, req: any): Promise<{
        id: string;
        updatedAt: Date;
        gameUsername: string;
        gamePasswordEncrypted: string;
        assignedBy: string | null;
        assignedAt: Date;
        userId: string;
        gameId: string;
    }>;
}
