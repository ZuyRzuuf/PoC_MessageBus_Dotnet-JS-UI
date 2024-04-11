import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { redpanda, redpandaTopic } from './redpanda.admin';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class RedpandaConsumer implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly webSocketService: WebsocketService) {}

  private readonly consumer = redpanda.consumer({ groupId: uuidv4() });

  async onModuleInit() {
    await this.connectAndSubscribe(redpandaTopic);
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }

  private async connectAndSubscribe(topic: string) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic });
    console.log(`NestJS RedPanda consumer subscribed to topic: ${topic}`);
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
        console.log('NestJS RedPanda consumer is running...');
        console.log('NestJS RedPanda consumer received message: ', {
          timestamp: timestamp?.toString(),
          value: value?.toString(),
        });
        this.webSocketService.emitMessage(
          'nestRedPandaMessage',
          value?.toString(),
        );
      },
    });
  }
}
