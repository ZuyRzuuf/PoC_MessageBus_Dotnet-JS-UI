import { v4 as uuidv4 } from 'uuid'
import { redpanda } from "./admin";

const consumer = redpanda.consumer({ groupId: uuidv4() });

export const connectConsumer = async (topic: string) => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: topic });

        await consumer.run({
            eachMessage: async ({ topic, partition, message: {timestamp, value} }) => {
                console.log('NodeJS RedPanda consumer received message:', {
                    timestamp: timestamp?.toString(),
                    value: value?.toString(),
                })
            },
        });
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
