import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';

interface IRequest {
  recipientId: string;
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: IRequest): Promise<Notification[]> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return notifications;
  }
}
