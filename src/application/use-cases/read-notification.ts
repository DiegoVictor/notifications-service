import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '@application/errors/notification';

interface IRequest {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: IRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findOneById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();

    await this.notificationRepository.save(notification);
  }
}
