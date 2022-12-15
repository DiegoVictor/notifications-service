import { NotificationNotFound } from '@application/errors/notification';
import { faker } from '@faker-js/faker';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { makeNotification } from '@tests/factories/notification';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notification = makeNotification();
    const payload = {
      notificationId: notification.id,
    };

    const notificationRepository = new InMemoryNotificationRepository([
      notification,
    ]);
    const service = new ReadNotification(notificationRepository);

    await service.execute(payload);

    expect(notificationRepository.notifications.at(0).readtAt).toStrictEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const service = new ReadNotification(notificationRepository);
    await expect(async () =>
      service.execute({ notificationId: faker.datatype.uuid() }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
