import { randomUUID } from 'crypto';
import { Replace } from '@helpers/replace';
import { Content } from '../validators/content';

export interface INotification {
  id?: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  recipientId: string;
  canceledAt?: Date;
}

export class Notification {
  id: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  recipientId: string;
  canceledAt?: Date;

  constructor({
    id = randomUUID(),
    content,
    category,
    readAt,
    createdAt = new Date(),
    recipientId,
    canceledAt,
  }: Replace<INotification, { createdAt?: Date }>) {
    this.id = id;
    this.content = content;
    this.category = category;

    if (readAt) {
      this.readAt = readAt;
    }

    this.createdAt = createdAt;
    this.recipientId = recipientId;
    this.canceledAt = canceledAt;
  }

  public cancel() {
    this.canceledAt = new Date();
  }

  public read() {
    this.readAt = new Date();
  }

  public unread() {
    this.readAt = null;
  }
}
