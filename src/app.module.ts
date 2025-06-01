import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';

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
      synchronize: true,
    }),
    ReviewsModule,
    UsersModule,
    AuthModule,
    EventsModule, 
  ],
})
export class AppModule {}
