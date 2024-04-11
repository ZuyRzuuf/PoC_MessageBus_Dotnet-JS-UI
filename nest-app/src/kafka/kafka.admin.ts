import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'node-app',
  brokers: ['127.0.0.1:9094'],
});
export const kafkaTopic = 'test-topic';

@Injectable()
export class KafkaAdmin implements OnModuleInit, OnModuleDestroy {
  private readonly admin = kafka.admin();

  async onModuleInit() {
    await this.createKafkaTopic(kafkaTopic, 1, 1);
  }

  async onModuleDestroy() {
    await this.admin.disconnect();
  }

  private async createKafkaTopic(
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
