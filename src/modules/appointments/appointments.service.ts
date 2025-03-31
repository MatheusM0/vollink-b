import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaProducerService } from '../kafka/kafka.producer';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async createAppointment(userId: number, serviceType: string, date: string) {
    const appointment = this.appointmentsRepository.create({ userId, serviceType, date });
    await this.appointmentsRepository.save(appointment);

    // Enviar evento para o Kafka
    await this.kafkaProducer.sendMessage('appointment.created', appointment);

    return appointment;
  }
}
