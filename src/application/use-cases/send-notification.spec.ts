import { faker } from '@faker-js/faker';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const content = faker.lorem.sentence();
    const payload = {
      category: faker.lorem.word(),
      content,
      recipientId: faker.datatype.uuid(),
    };

    const notificationRepository = new InMemoryNotificationRepository();
    const service = new SendNotification(notificationRepository);

    const { notification } = await service.execute(payload);

    expect(notification).toBeInstanceOf(Notification);
    expect(notificationRepository.notifications).toEqual([notification]);
  });
});
