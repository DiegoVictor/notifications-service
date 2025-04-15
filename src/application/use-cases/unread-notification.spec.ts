import { faker } from '@faker-js/faker';
import { NotificationNotFound } from '@application/errors/notification.errors';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { makeNotification } from '@tests/factories/notification';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notification = makeNotification({ readAt: faker.date.past() });
    const payload = {
      notificationId: notification.id,
    };

    const notificationRepository = new InMemoryNotificationRepository([
      notification,
    ]);
    const service = new UnreadNotification(notificationRepository);

    await service.execute(payload);

    expect(notificationRepository.notifications.at(0).readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const service = new UnreadNotification(notificationRepository);
    await expect(async () =>
      service.execute({ notificationId: faker.string.uuid() }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
