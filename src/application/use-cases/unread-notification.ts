import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { NotificationNotFound } from '@application/errors/notification.errors';

interface IRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: IRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findOneById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
