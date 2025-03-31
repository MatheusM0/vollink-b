import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Garante que as variáveis do .env estejam disponíveis globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'vollink',
      password: process.env.DB_PASSWORD || 'senha123', // Garante que sempre será uma string válida
      database: process.env.DB_NAME || 'vollink_db',
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true',
    })    
  ],
})
export class DatabaseModule {}
