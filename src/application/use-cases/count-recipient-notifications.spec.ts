import { Content } from '@application/validators/content';
import { faker } from '@faker-js/faker';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { Notification } from '../entities/notification';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const content = faker.lorem.sentence();
    const notifications = [
      new Notification({
        category: faker.lorem.word(),
        content: new Content(content),
        recipientId: faker.datatype.uuid(),
      }),
      new Notification({
        category: faker.lorem.word(),
        content: new Content(content),
        recipientId: faker.datatype.uuid(),
      }),
    ];
    const [notification] = notifications;

    const notificationRepository = new InMemoryNotificationRepository(
      notifications,
    );
    const service = new CountRecipientNotifications(notificationRepository);

    const { count } = await service.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toStrictEqual(
      notificationRepository.notifications.filter(
        ({ recipientId }) => recipientId === notification.recipientId,
      ).length,
    );
  });
});
