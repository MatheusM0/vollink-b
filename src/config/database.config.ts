import { Module } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST = 'localhost', // Usa 'localhost' se estiver undefined
  port: parseInt(process.env.DB_PORT = '5432', 10), // Garante que será um número válido
  username: process.env.DB_USER = 'vollink',
  password: process.env.DB_PASSWORD = 'senha123',
  database: process.env.DB_NAME = 'vollink_db',
  autoLoadEntities: true,
  synchronize: process.env.DB_SYNC === 'true', // Converte string para booleano corretamente
}));
