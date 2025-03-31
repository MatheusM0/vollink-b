import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';

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

  @Post()
  create(@Body() eventData: any) {
    return this.eventsService.create(eventData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.eventsService.delete(id);
  }
}
