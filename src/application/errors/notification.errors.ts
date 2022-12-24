export class NotificationNotFound extends Error {
  public message: string;

  constructor() {
    super('Notification Not Found');
  }
}
