import { Body, Controller, Post } from '@nestjs/common';
import { RedpandaService } from './redpanda.service';
import { MessageDto } from '../dto/message.dto';

@Controller('redpanda')
export class RedpandaController {
  constructor(private readonly redpandaService: RedpandaService) {} // 👈 Inject RedpandaService;

  @Post('producer')
  async postRedPandaProducer(@Body() message: MessageDto) {
    if (!message) {
      return 'Please provide a message to send to RedPanda';
    }

    return this.redpandaService.postRedPandaProducer(message);
  }
}
