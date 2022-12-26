import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
