import { Controller, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(@Body() body: { userId: number; serviceType: string; date: string }) {
    return this.appointmentsService.createAppointment(body.userId, body.serviceType, body.date);
  }
}
