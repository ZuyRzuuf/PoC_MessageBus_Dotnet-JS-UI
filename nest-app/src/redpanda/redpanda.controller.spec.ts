import { Test, TestingModule } from '@nestjs/testing';
import { RedpandaController } from './redpanda.controller';

describe('RedpandaController', () => {
  let controller: RedpandaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedpandaController],
    }).compile();

    controller = module.get<RedpandaController>(RedpandaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
