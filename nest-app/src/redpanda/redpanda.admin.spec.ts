import { RedpandaAdmin } from './redpanda.admin';

describe('RedpandaAdmin', () => {
  it('should be defined', () => {
    expect(new RedpandaAdmin()).toBeDefined();
  });
});
