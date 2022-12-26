import { SendNotification } from '@application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface IMessage {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern(process.env.KAFKA_TOPIC)
  async handleSendNotification(@Payload() message: IMessage) {
    await this.sendNotification.execute(message);
  }
}
