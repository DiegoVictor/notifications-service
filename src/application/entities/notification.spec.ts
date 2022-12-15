import { faker } from '@faker-js/faker';
import { Content } from '../validators/content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', async () => {
    const content = faker.lorem.sentence();
    const notification = new Notification({
      category: faker.lorem.word(),
      content: new Content(content),
      recipientId: faker.datatype.uuid(),
      readtAt: faker.date.past(),
    });

    expect(notification).toBeInstanceOf(Notification);
  });

  it('should be able to cancel a notification', async () => {
    const content = faker.lorem.sentence();
    const notification = new Notification({
      category: faker.lorem.word(),
      content: new Content(content),
      recipientId: faker.datatype.uuid(),
      readtAt: faker.date.past(),
    });

    expect(notification.canceledAt).toBe(undefined);

    notification.cancel();

    expect(notification.canceledAt).toStrictEqual(expect.any(Date));
  });
});
