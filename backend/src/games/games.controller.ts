import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) { }

    @Get()
    async getActiveGames() {
        return this.gamesService.findAllActive();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Get('admin')
    async getAllGamesAdmin() {
        return this.gamesService.findAllAdmin();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('admin')
    async createGame(@Body() body: any) {
        return this.gamesService.createGame(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/my-credentials')
    async getMyCredentials(@Param('id') gameId: string, @Request() req: any) {
        return this.gamesService.getUserCredentials(req.user.id, gameId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Post('admin/users/:userId/credentials')
    async assignCredential(
        @Param('userId') userId: string,
        @Body() body: { gameId: string; username: string; plainTextPassword: string },
        @Request() req: any
    ) {
        return this.gamesService.assignCredential(
            userId,
            body.gameId,
            body.username,
            body.plainTextPassword,
            req.user.id
        );
    }
}
