import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaController } from './kafka/kafka.controller';
import { RedpandaController } from './redpanda/redpanda.controller';
import { RedpandaService } from './redpanda/redpanda.service';
import { RedpandaAdmin } from './redpanda/redpanda.admin';
import { RedpandaConsumer } from './redpanda/redpanda.consumer';
import { RedpandaProducer } from './redpanda/redpanda.producer';
import { KafkaAdmin } from './kafka/kafka.admin';
import { KafkaConsumer } from './kafka/kafka.consumer';
import { KafkaProducer } from './kafka/kafka.producer';
import { KafkaService } from './kafka/kafka.service';
import { WebsocketService } from './websocket/websocket.service';

@Module({
  imports: [],
  controllers: [AppController, KafkaController, RedpandaController],
  providers: [
    AppService,
    RedpandaService,
    RedpandaAdmin,
    RedpandaConsumer,
    RedpandaProducer,
    KafkaService,
    KafkaAdmin,
    KafkaConsumer,
    KafkaProducer,
    WebsocketService,
  ],
})
export class AppModule {}
