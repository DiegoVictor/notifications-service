import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/notification';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toEntity(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
