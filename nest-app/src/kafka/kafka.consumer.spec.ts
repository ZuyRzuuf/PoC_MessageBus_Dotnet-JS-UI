import { KafkaConsumer } from './kafka.consumer';

describe('KafkaConsumer', () => {
  it('should be defined', () => {
    expect(new KafkaConsumer()).toBeDefined();
  });
});
