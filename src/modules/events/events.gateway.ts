import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsService } from './events.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Ajuste conforme necessário
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventsService: EventsService) {}

  // Evento disparado quando um usuário se inscreve em um evento
  @SubscribeMessage('joinEvent')
  async handleJoinEvent(@MessageBody() data: { eventId: number; userId: number }) {
    const event = await this.eventsService.findOne(data.eventId);
    if (!event) {
      return { error: 'Evento não encontrado' };
    }

    this.server.emit(`eventUpdated-${data.eventId}`, { message: `Usuário ${data.userId} se inscreveu no evento!` });
    return { success: true };
  }

  // Evento disparado quando um evento é atualizado
  @SubscribeMessage('updateEvent')
  handleUpdateEvent(@MessageBody() eventData: any) {
    this.server.emit(`eventUpdated-${eventData.id}`, { message: 'O evento foi atualizado', data: eventData });
  }

  // Evento disparado quando um evento é cancelado
  @SubscribeMessage('cancelEvent')
  handleCancelEvent(@MessageBody() eventId: number) {
    this.server.emit(`eventUpdated-${eventId}`, { message: 'O evento foi cancelado' });
  }
}
