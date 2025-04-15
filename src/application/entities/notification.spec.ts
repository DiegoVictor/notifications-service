import { faker } from '@faker-js/faker';
import { makeNotification } from '@tests/factories/notification';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = makeNotification({ readAt: new Date() });

    expect(notification).toBeInstanceOf(Notification);
  });

  it('should be able to cancel a notification', () => {
    const notification = makeNotification();

    expect(notification.canceledAt).toBe(undefined);

    notification.cancel();

    expect(notification.canceledAt).toStrictEqual(expect.any(Date));
  });

  it('should be able to read a notification', () => {
    const notification = makeNotification();

    expect(notification.readAt).toBe(undefined);

    notification.read();

    expect(notification.readAt).toStrictEqual(expect.any(Date));
  });

  it('should be able to unread a notification', () => {
    const readAt = faker.date.past();
    const notification = makeNotification({
      readAt,
    });

    expect(notification.readAt).toStrictEqual(readAt);

    notification.unread();

    expect(notification.readAt).toStrictEqual(null);
  });
});
