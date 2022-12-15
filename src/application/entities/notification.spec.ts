import { faker } from '@faker-js/faker';
import { makeNotification } from '@tests/factories/notification';
import { Content } from '../validators/content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', async () => {
    const notification = makeNotification();

    expect(notification).toBeInstanceOf(Notification);
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    expect(notification.canceledAt).toBe(undefined);

    notification.cancel();

    expect(notification.canceledAt).toStrictEqual(expect.any(Date));
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    expect(notification.readtAt).toBe(undefined);

    notification.read();

    expect(notification.readtAt).toStrictEqual(expect.any(Date));
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readtAt: faker.date.past(),
    });

    notification.unread();

    expect(notification.readtAt).toStrictEqual(null);
  });
});
