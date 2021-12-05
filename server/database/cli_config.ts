import '../env';

export = process.env.NODE_ENV === 'development'
  ? {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: process.env.DATABASE_URL,
      autoLoadEntities: true,
      migrations: ['server/database/migrations/*.ts'],
      seeds: ['server/database/seeds.ts'],
      cli: {
        migrationsDir: 'server/database/migrations',
      },
      entities: ['server/entities/**/*.entity.ts'],
    }
  : {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      migrations: ['server/database/migrations/*.ts'],
      seeds: ['server/database/seeds.ts'],
      cli: {
        migrationsDir: 'server/database/migrations',
      },
      entities: ['server/entities/**/*.entity.ts'],
    };
