import { KafkaAdmin } from './kafka.admin';

describe('KafkaAdmin', () => {
  it('should be defined', () => {
    expect(new KafkaAdmin()).toBeDefined();
  });
});
