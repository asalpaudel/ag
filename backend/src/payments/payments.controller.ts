import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('payment-methods')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    async getActiveMethods() {
        return this.paymentsService.findAllActive();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'staff')
    @Get('admin')
    async getAllAdmin() {
        return this.paymentsService.findAllAdmin();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('admin')
    async createMethod(@Body() body: any) {
        return this.paymentsService.createMethod(body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put('admin/:id')
    async updateMethod(@Param('id') id: string, @Body() body: any) {
        return this.paymentsService.updateMethod(id, body);
    }
}
