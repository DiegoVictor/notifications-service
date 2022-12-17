import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationDto } from '../dtos/notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch('/:id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch('/:id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch('/:id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Get('/recipient/:id/count')
  async countByRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId: id,
    });

    return { count };
  }

  @Get('/recipient/:id')
  async getByRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });

    return notifications.map(NotificationViewModel.parse);
  }

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return NotificationViewModel.parse(notification);
  }
}
