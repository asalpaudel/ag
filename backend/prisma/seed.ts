import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.user.findUnique({ where: { username: 'admin' } });
    if (existing) {
        console.log('Admin user already exists, skipping seed.');
        return;
    }

    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            fullName: 'Administrator',
            passwordHash,
            role: 'admin',
            status: 'active',
        },
    });
    console.log(`Admin user created: ${admin.username} (id: ${admin.id})`);
    console.log('Login: username=admin  password=admin123');
    console.log('IMPORTANT: Change this password immediately after first login.');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
