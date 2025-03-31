import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      },
      consumer: {
        groupId: 'vollink-notifications-group',
      },
    },
  })
  private kafkaClient: ClientKafka;

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('user.created');
    this.kafkaClient.subscribeToResponseOf('appointment.created');
    this.kafkaClient.subscribeToResponseOf('review.received');

    await this.kafkaClient.connect();
    console.log('✅ Kafka Consumer conectado');
  }

  async handleUserCreated(message: any) {
    console.log(`👤 Novo usuário cadastrado:`, message.value.toString());
  }

  async handleAppointmentCreated(message: any) {
    console.log(`📅 Novo agendamento:`, message.value.toString());
  }

  async handleReviewReceived(message: any) {
    console.log(`⭐ Nova avaliação recebida:`, message.value.toString());
  }
}
