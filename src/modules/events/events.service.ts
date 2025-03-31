import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOne({ where: { id } });
  }

  create(eventData: Partial<Event>) {
    const event = this.eventRepository.create(eventData);
    return this.eventRepository.save(event);
  }

  delete(id: number) {
    return this.eventRepository.delete(id);
  }

  async findConfirmedEvents(userId: number): Promise<Event[]> {
    // Aguarde a busca dos eventos antes de filtrar
    const events = await this.eventRepository.find({ relations: ['participants'] });

    // Aplicando list comprehension para filtrar eventos confirmados para o usuário
    return events.filter(event => event.participants.some(p => p.id === userId));
  }
  
}


