import { faker } from '@faker-js/faker';
import { makeNotification } from '@tests/factories/notification';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const recipientId = faker.datatype.uuid();
    const notifications = [
      makeNotification({ recipientId }),
      makeNotification({ recipientId }),
    ];

    const notificationRepository = new InMemoryNotificationRepository(
      notifications,
    );
    const service = new GetRecipientNotifications(notificationRepository);

    const response = await service.execute({
      recipientId,
    });

    notifications.forEach((notification) => {
      expect(response).toContainEqual(notification);
    });
  });
});
