import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';

interface IRequest {
  recipientId: string;
}

interface IResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
