import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static parse(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt,
    };
  }
}
