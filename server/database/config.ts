import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import '../env';

export const config: TypeOrmModuleOptions =
  process.env.NODE_ENV === 'development'
    ? {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: process.env.DATABASE_URL,
        autoLoadEntities: true,
      }
    : {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        ssl: { rejectUnauthorized: false },
      };
