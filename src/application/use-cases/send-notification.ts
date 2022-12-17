import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification.repository';
import { Content } from '../validators/content';

interface IRequest {
  content: string;
  category: string;
  recipientId: string;
}

interface IResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { content, category, recipientId } = request;

    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return { notification };
  }
}
