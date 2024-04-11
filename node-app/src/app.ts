import express from 'express';
import * as dotevnv from 'dotenv';
import { Server } from 'socket.io';

import { createTopic as createKafkaTopic } from './kafka/admin'
import { getConnection as getKafkaConnection, disconnect as disconnectKafkaProducer } from './kafka/producer'
import { connectConsumer as connectKafkaConsumer, disconnect as disconnectKafkaConsumer } from './kafka/consumer'

import { createTopic as createRedPandaTopic } from './redpanda/admin'
import { getConnection as getRedPandaConnection, disconnect as disconnectRedPandaProducer } from './redpanda/producer'
import { connectConsumer as connectRedPandaConsumer, disconnect as disconnectRedPandaConsumer } from './redpanda/consumer'

dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)
const app = express();
const io = new Server(8083, { cors: { origin: 'http://localhost:3000' } });

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const topic = "test-topic";

connectKafkaConsumer(topic).then(() => console.log('Kafka consumer setup complete.'));
connectRedPandaConsumer(topic).then(() => console.log('RedPanda consumer setup complete.'));

app.get('/kafka', async (req, res) => {
    await createKafkaTopic(topic, 1, 1);

    const sendMessage = await getKafkaConnection(topic);

    if (sendMessage) {
        await sendMessage('Hello Kafka!');
    }

    res.send('NodeApp is waiting for Kafka message...');
});

app.get('/redpanda', async (req, res) => {
    await createRedPandaTopic(topic, 1, 1);

    const sendMessage = await getRedPandaConnection(topic);

    if (sendMessage) {
        await sendMessage('Hello RedPanda!');
    }

    res.send('NodeApp is waiting for RedPanda message...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('message', 'Hello from NodeApp backend!');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

process.on("SIGINT", async () => {
    console.log('Closing app...');
    try {
        await disconnectKafkaProducer()
        await disconnectKafkaConsumer()
        await disconnectRedPandaProducer()
        await disconnectRedPandaConsumer()
    } catch (err) {
        console.error('Error during cleanup:', err);
        process.exit(1);
    } finally {
        console.log('Cleanup finished. Exiting');
        process.exit(0);
    }
});