import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class PingGateway {
  constructor() {}

  @SubscribeMessage('ping/:id')
  public handlePing() {
    return { message: 'recieved ping' };
  }
}
