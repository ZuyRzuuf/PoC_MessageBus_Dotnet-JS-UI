import { RedpandaProducer } from './redpanda.producer';

describe('RedpandaProducer', () => {
  it('should be defined', () => {
    expect(new RedpandaProducer()).toBeDefined();
  });
});
