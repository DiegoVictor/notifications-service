require('dotenv').config();

const { Kafka } = require('kafkajs');
const { faker } = require('@faker-js/faker');

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER],
});
const producer = kafka.producer();

(async () => {
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [
      {
        value: JSON.stringify({
          category: faker.lorem.word(),
          content: faker.lorem.sentence(),
          recipientId: faker.datatype.uuid(),
        }),
      },
    ],
  });

  await producer.disconnect();
})();
