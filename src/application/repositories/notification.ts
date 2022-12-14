import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  public abstract create(notification: Notification): Promise<void>;
}
