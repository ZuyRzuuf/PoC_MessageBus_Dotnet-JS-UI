import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MessageDto } from '../dto/message.dto';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {} // 👈 Inject KafkaService;

  @Post('producer')
  async postKafkaProducer(@Body() message: MessageDto) {
    if (!message) {
      return 'Please provide a message to send to Kafka';
    }

    return this.kafkaService.postKafkaProducer(message);
  }
}
