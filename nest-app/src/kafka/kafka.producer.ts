import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { kafka, kafkaTopic } from './kafka.admin';
import { MessageDto } from '../dto/message.dto';

@Injectable()
export class KafkaProducer implements OnApplicationShutdown {
  private readonly producer = kafka.producer();

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async sendMessage(message: MessageDto) {
    console.log('NestJS Kafka producer is sending message: ', message);
    await this.producer.connect();
    await this.producer.send({
      acks: 1,
      topic: kafkaTopic,
      messages: [{ timestamp: Date.now().toString(), value: message.message }],
    });
  }
}
