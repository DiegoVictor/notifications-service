import { Notification as NotificationEntity } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/validators/content';

export class PrismaNotificationMapper {
  static toEntity(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: NotificationEntity): Notification {
    return new Notification({
      id: raw.id,
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt,
    });
  }
}
