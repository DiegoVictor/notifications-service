import { faker } from '@faker-js/faker';
import {
  INotification,
  Notification,
} from '@application/entities/notification';
import { Content } from '@application/validators/content';

export function makeNotification(override: Partial<INotification> = {}) {
  const content = faker.lorem.sentence();
  const notification = new Notification({
    category: faker.lorem.word(),
    content: new Content(content),
    recipientId: faker.datatype.uuid(),
    ...override,
  });

  return notification;
}
