import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

async findAll(): Promise<Event[]> {
  return this.eventRepository.find({
    relations: ['volunteer'],
  });
}

findOne(id: number) {
  return this.eventRepository.findOne({ where: { id } });
}

async create(dto: CreateEventDto): Promise<Event> {
  const event = this.eventRepository.create(dto);
  return this.eventRepository.save(event);
}

delete(id: number) {
  return this.eventRepository.delete(id);
}

async findByVolunteerId(volunteerId: number): Promise<Event[]> {
  return this.eventRepository.find({
    where: { volunteer: { id: volunteerId } },
    relations: ['volunteer'],
  });
}

async findConfirmedEvents(userId: number): Promise<Event[]> {
  // Aguarde a busca dos eventos antes de filtrar
  const events = await this.eventRepository.find({ relations: ['participants'] });

  // Aplicando list comprehension para filtrar eventos confirmados para o usuário
  return events.filter(event => event.participants.some(p => p.id === userId));
}
  
}


