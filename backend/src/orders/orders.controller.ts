import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    // --- Player endpoints ---

    @UseGuards(JwtAuthGuard)
    @Post('topup')
    async requestTopUp(@Body() body: { gameId: string; paymentMethodId: string; amount: number }, @Request() req: any) {
        return this.ordersService.createTopUp(req.user.id, body.gameId, body.paymentMethodId, body.amount);
    }

    @UseGuards(JwtAuthGuard)
    @Post('withdraw')
    async requestWithdraw(@Body() body: { paymentMethodId: string; payoutTag: string; amount: number }, @Request() req: any) {
        return this.ordersService.createWithdraw(req.user.id, body.paymentMethodId, body.payoutTag, body.amount);
    }

    @UseGuards(JwtAuthGuard)
    @Get('topup/my')
    async myTopUps(@Request() req: any) {
        return this.ordersService.getPlayerTopUps(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('withdraw/my')
    async myWithdraws(@Request() req: any) {
        return this.ordersService.getPlayerWithdraws(req.user.id);
    }

    // --- Admin/Staff endpoints ---

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Get('admin/stats')
    async getStats() {
        return this.ordersService.getStats();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Get('admin/topups')
    async getAllTopUps() {
        return this.ordersService.getAdminTopUps();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Get('admin/withdraws')
    async getAllWithdraws() {
        return this.ordersService.getAdminWithdraws();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Put('topup/admin/:id/status')
    async updateTopUp(@Param('id') id: string, @Body() body: { status: string }, @Request() req: any) {
        return this.ordersService.updateTopUpStatus(id, body.status, req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Put('withdraw/admin/:id/status')
    async updateWithdraw(@Param('id') id: string, @Body() body: { status: string }, @Request() req: any) {
        return this.ordersService.updateWithdrawStatus(id, body.status, req.user.id);
    }
}
