import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Carrega o .env para todo o app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10), // Garante que seja um número
      username: process.env.DB_USER || 'vollink',
      password: process.env.DB_PASSWORD?.toString() || 'senha123', // Garante que a senha seja uma string
      database: process.env.DB_NAME || 'vollink_db',
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true',
    }),
    ReviewsModule,
    UsersModule, 
  ],
})
export class AppModule {}
