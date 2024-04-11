import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

export const redpanda = new Kafka({
  brokers: ['localhost:19092'],
});
export const redpandaTopic = 'test-topic';

@Injectable()
export class RedpandaAdmin implements OnModuleInit, OnModuleDestroy {
  private readonly admin = redpanda.admin();

  async onModuleInit() {
    await this.createRedPandaTopic(redpandaTopic, 1, 1);
  }

  async onModuleDestroy() {
    await this.admin.disconnect();
  }

  private async createRedPandaTopic(
    topic: string,
    partitions?: number,
    replicas?: number,
  ) {
    await this.admin.connect();

    const existingTopics = await this.admin.listTopics();

    if (!existingTopics.includes(topic)) {
      await this.admin.createTopics({
        topics: [
          {
            topic: topic,
            numPartitions: partitions ? partitions : 1,
            replicationFactor: replicas ? replicas : 1,
          },
        ],
      });
    }

    await this.admin.disconnect();
  }
}
