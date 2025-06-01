import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Get('voluntario/:id')
  async findByVolunteer(@Param('id') id: number) {
    return this.eventsService.findByVolunteerId(id);
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
  return this.eventsService.create(createEventDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.eventsService.delete(id);
  }
}
