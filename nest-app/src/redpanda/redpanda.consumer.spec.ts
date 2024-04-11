import { RedpandaConsumer } from './redpanda.consumer';

describe('RedpandaConsumer', () => {
  it('should be defined', () => {
    expect(new RedpandaConsumer()).toBeDefined();
  });
});
