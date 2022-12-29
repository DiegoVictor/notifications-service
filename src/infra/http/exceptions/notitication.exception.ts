import { NotificationNotFound } from '@application/errors/notification.errors';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

export class NotificationExceptionHandler {
  static handle(err: Error) {
    switch (err.constructor) {
      case NotificationNotFound:
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: err.message,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );

      default:
        throw err;
    }
  }
}
