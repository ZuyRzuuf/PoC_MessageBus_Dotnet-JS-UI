import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { kafka, kafkaTopic } from './kafka.admin';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly webSocketService: WebsocketService) {}

  private readonly consumer = kafka.consumer({ groupId: uuidv4() });

  async onModuleInit() {
    await this.connectAndSubscribe(kafkaTopic);
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }

  private async connectAndSubscribe(topic: string) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic });
    console.log(`NestJS Kafka consumer subscribed to topic: ${topic}`);
    await this.startConsuming();
  }

  private async startConsuming() {
    await this.consumer.run({
      eachMessage: async ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        topic,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        partition,
        message: { timestamp, value },
      }) => {
        console.log('NestJS Kafka consumer is running...');
        console.log('NestJS Kafka consumer received message: ', {
          timestamp: timestamp?.toString(),
          value: value?.toString(),
        });
        this.webSocketService.emitMessage(
          'nestKafkaMessage',
          value?.toString(),
        );
      },
    });
  }
}
