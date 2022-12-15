import { makeNotification } from '@tests/factories/notification';
import { InMemoryNotificationRepository } from '@tests/repositories/notification';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notifications = [makeNotification(), makeNotification()];
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
