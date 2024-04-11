import { Injectable } from '@nestjs/common';
import { RedpandaProducer } from './redpanda.producer';
import { MessageDto } from '../dto/message.dto';

@Injectable()
export class RedpandaService {
  constructor(private readonly redpandaProducer: RedpandaProducer) {}

  async postRedPandaProducer(message: MessageDto): Promise<string> {
    await this.redpandaProducer.sendMessage(message);

    return 'NestApp is producing RedPanda message...';
  }
}
