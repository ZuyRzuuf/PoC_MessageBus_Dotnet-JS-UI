import { kafka } from "./admin";
import { Server } from "socket.io";

const consumer = kafka.consumer({ groupId: 'test-group' })

export const connectConsumer = async (topic: string, io: Server) => {
    try {
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message: {timestamp, value} }) => {
                console.log('NodeJS Kafka consumer received message:', {
                    timestamp: timestamp?.toString(),
                    value: value?.toString(),
                })
                io.emit('nodeKafkaMessage', value?.toString())
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
