import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toEntity(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readtAt,
      createdAt: notification.createdAt,
    };
  }
}
