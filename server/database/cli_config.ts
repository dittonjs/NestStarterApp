import '../env';

export = process.env.NODE_ENV === 'development'
  ? {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: process.env.DATABASE_URL,
      autoLoadEntities: true,
      migrations: ['src/database/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    }
  : {
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: true },
      migrations: ['src/database/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    };
