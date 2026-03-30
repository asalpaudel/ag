"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const encryption_module_1 = require("./encryption/encryption.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const games_module_1 = require("./games/games.module");
const payments_module_1 = require("./payments/payments.module");
const orders_module_1 = require("./orders/orders.module");
const audit_module_1 = require("./audit/audit.module");
const events_module_1 = require("./events/events.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            encryption_module_1.EncryptionModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            games_module_1.GamesModule,
            payments_module_1.PaymentsModule,
            orders_module_1.OrdersModule,
            audit_module_1.AuditModule,
            events_module_1.EventsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map