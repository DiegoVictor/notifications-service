import { NotificationNotFound } from '@application/errors/notification';
import { Content } from '@application/validators/content';
import { faker } from '@faker-js/faker';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const content = faker.lorem.sentence();
    const notification = new Notification({
      category: faker.lorem.word(),
      content: new Content(content),
      recipientId: faker.datatype.uuid(),
    });
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
