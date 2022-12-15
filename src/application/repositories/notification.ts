import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  public abstract create(notification: Notification): Promise<void>;
  public abstract findOneById(id: string): Promise<Notification | null>;
  public abstract save(notification: Notification): Promise<void>;
  public abstract countManyByRecipientId(recipientId: string): Promise<number>;
}
