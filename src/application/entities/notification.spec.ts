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
});
