import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
    clientId: 'node-app',
    brokers: ['127.0.0.1:9094'],
});
const admin = kafka.admin();

export async function createTopic(
    topic: string,
    partitions?: number,
    replicas?: number
) {
    await admin.connect();

    const existingTopics = await admin.listTopics();

    if (!existingTopics.includes(topic)) {
        await admin.createTopics({
            topics: [
                {
                    topic: topic,
                    numPartitions: partitions ? partitions : 1,
                    replicationFactor: replicas ? replicas : 1,
                },
            ],
        });
    }

    await admin.disconnect();
}