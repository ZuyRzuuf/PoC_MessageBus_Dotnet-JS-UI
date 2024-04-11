import { kafka } from "./admin";

const producer = kafka.producer()

export async function getConnection(topic: string) {
    try {
        await producer.connect();

        return async (message: string) => {
            console.log('NodeJS Kafka producer is sending message: ', message);
            await producer.send({
                topic: topic,
                messages: [{ timestamp: Date.now().toString(), value: message }],
            });
        };
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function disconnect() {
    try {
        await producer.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}
