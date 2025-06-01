import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { KafkaProducerService } from "../kafka/kafka.producer";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
    }); 

    // Enviar evento para o Kafka
    await this.kafkaProducer.sendMessage('user.created', user);

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string){
    return this.usersRepository.findOne({ where: { username } });
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