import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification.repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/notification.mapper';
import { Content } from '@application/validators/content';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findOneById(id: string): Promise<Notification | null> {
    const record = await this.prismaService.notification.findUnique({
      where: { id },
    });

    return new Notification({
      ...record,
      content: new Content(record.content),
    });
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const records = await this.prismaService.notification.findMany({
      where: { recipientId },
    });

    return records.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toEntity(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toEntity(notification);

    await this.prismaService.notification.update({
      data: raw,
      where: {
        id: raw.id,
      },
    });
  }
}
