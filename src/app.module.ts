import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(process.env.NODE_ENV === 'development' ? {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: process.env.DATABASE_URL,
      autoLoadEntities: true,
    } : {
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: true }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
