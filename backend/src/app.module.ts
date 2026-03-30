import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EncryptionModule } from './encryption/encryption.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { AuditModule } from './audit/audit.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaModule,
    EncryptionModule,
    UsersModule,
    AuthModule,
    GamesModule,
    PaymentsModule,
    OrdersModule,
    AuditModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
