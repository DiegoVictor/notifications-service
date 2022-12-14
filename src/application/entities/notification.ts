import { randomUUID } from 'crypto';
import { Replace } from '@helpers/replace';
import { Content } from '../validators/content';

interface INotification {
  content: Content;
  category: string;
  readtAt?: Date | null;
  createdAt: Date;
  recipientId: string;
}

export class Notification {
  id: string;
  content: Content;
  category: string;
  readtAt?: Date | null;
  createdAt: Date;
  recipientId: string;

  constructor({
    content,
    category,
    readtAt,
    createdAt = new Date(),
    recipientId,
  }: Replace<INotification, { createdAt?: Date }>) {
    this.id = randomUUID();
    this.content = content;
    this.category = category;

    if (readtAt) {
      this.readtAt = readtAt;
    }

    this.createdAt = createdAt;
    this.recipientId = recipientId;
  }
}
