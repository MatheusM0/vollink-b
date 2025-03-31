import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => ({
  clientId: process.env.KAFKA_CLIENT_ID || 'vollink-app',
  brokers: (process.env.KAFKA_BROKER || 'localhost:9092').split(','),
  groupId: process.env.KAFKA_GROUP_ID || 'vollink-group',
}));
