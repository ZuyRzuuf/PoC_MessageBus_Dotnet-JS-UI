import { kafka } from "./admin";

const consumer = kafka.consumer({ groupId: 'test-group' })

export const connectConsumer = async (topic: string) => {
    try {
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message: {timestamp, value} }) => {
                console.log('NodeJS Kafka consumer received message:', {
                    timestamp: timestamp?.toString(),
                    value: value?.toString(),
                })
            },
        })
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function disconnect() {
    try {
        await consumer.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}
