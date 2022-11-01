import '../src/env';
import { PrismaClient, RoleKey} from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  console.log("RUNNING SEEDS");

  // CREATE ROLES
  for (const roleKey in RoleKey) {
    await prisma.role.upsert({
      where: { roleKey: roleKey as RoleKey },
      update: {},
      create: {
        roleKey: roleKey as RoleKey,
      }
    });
  }

  const adminRole = await prisma.role.findUnique({
    where: { roleKey: RoleKey.ADMIN }
  });

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {
      passwordHash,
    },
    create: {
      email: process.env.ADMIN_EMAIL,
      firstName: 'ADMIN',
      lastName: 'SITE',
      passwordHash,
      userRoles: {
        create: {
          roleId: adminRole.id,
          contextId: "SITE"
        }
      }
    }
  });

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })