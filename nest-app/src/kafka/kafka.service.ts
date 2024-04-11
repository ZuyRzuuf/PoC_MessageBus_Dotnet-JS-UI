import { Injectable } from '@nestjs/common';
import { KafkaProducer } from './kafka.producer';
import { MessageDto } from '../dto/message.dto';

@Injectable()
export class KafkaService {
  constructor(private readonly kafkaProducer: KafkaProducer) {}

  async postKafkaProducer(message: MessageDto): Promise<string> {
    await this.kafkaProducer.sendMessage(message);

    return 'NestApp is producing Kafka message...';
  }
}
