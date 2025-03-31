import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { KafkaProducerService } from "../kafka/kafka.producer";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  findByUsername(username: string) {
      throw new Error('Method not implemented.');
  }
  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: any) {
    const user = { name, email };

    // Enviar evento para o Kafka
    await this.kafkaProducer.sendMessage('user.created', user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  private processUsers(users: string[], callback: (user: string) => void): void {
    users.forEach(callback);
  }
  
  notifyUsers(users: string[]): void {
    this.processUsers(users, user => this.sendNotification(user, "Nova atualização disponível!"));
  }
  async sendNotification(user: string, message: string): Promise<void> {
    console.log(`Sending notification to ${user}: ${message}`);
    // Send notification event to Kafka
    await this.kafkaProducer.sendMessage('user.notification', { user, message });
  }
  
  
}