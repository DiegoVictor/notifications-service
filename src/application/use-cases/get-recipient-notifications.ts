import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';

interface IRequest {
  recipientId: string;
}

interface IResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
