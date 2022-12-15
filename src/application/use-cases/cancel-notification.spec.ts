import { NotificationNotFound } from '@application/errors/notification';
import { faker } from '@faker-js/faker';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { CancelNotification } from './cancel-notification';
import { makeNotification } from '@tests/factories/notification';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();
    const payload = {
      notificationId: notification.id,
    };

    const notificationRepository = new InMemoryNotificationRepository([
      notification,
    ]);
    const service = new CancelNotification(notificationRepository);

    await service.execute(payload);

    expect(notificationRepository.notifications.at(0).canceledAt).toStrictEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const service = new CancelNotification(notificationRepository);
    await expect(async () =>
      service.execute({ notificationId: faker.datatype.uuid() }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
