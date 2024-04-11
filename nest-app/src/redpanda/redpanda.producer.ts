import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { redpanda, redpandaTopic } from './redpanda.admin';
import { MessageDto } from '../dto/message.dto';

@Injectable()
export class RedpandaProducer implements OnApplicationShutdown {
  private readonly producer = redpanda.producer();

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async sendMessage(message: MessageDto) {
    console.log('NestJS RedPanda producer is sending message: ', message);
    await this.producer.connect();
    await this.producer.send({
      acks: 1,
      topic: redpandaTopic,
      messages: [{ timestamp: Date.now().toString(), value: message.message }],
    });
  }
}
