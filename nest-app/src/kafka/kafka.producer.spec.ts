import { KafkaProducer } from './kafka.producer';

describe('KafkaProducer', () => {
  it('should be defined', () => {
    expect(new KafkaProducer()).toBeDefined();
  });
});
