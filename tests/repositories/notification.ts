import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification.repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  constructor(notifications?: Notification[]) {
    if (notifications) {
      this.notifications = notifications;
    }
  }

  public async findOneById(id: string): Promise<Notification> {
    return this.notifications.find((notification) => notification.id === id);
  }

  public async findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  public async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  public async create(notification: Notification) {
    this.notifications.push(notification);
  }

  public async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      ({ id }) => notification.id === id,
    );

    if (notificationIndex === -1) {
      return null;
    }

    this.notifications.splice(notificationIndex, 1, notification);
  }
}
