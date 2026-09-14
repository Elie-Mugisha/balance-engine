import 'reflect-metadata';

describe('BalanceEngine Test Harness', () => {
  it('runs a basic test assertion', () => {
    const sum = (a: number, b: number): number => a + b;
    expect(sum(10, 20)).toBe(30);
  });

  it('verifies reflect-metadata works at runtime', () => {
    const METADATA_KEY = 'custom:role';

    class Account {
      constructor(public readonly id: string) {}
    }

    Reflect.defineMetadata(METADATA_KEY, 'financialAsset', Account);

    const value = Reflect.getMetadata(METADATA_KEY, Account)
    expect(value).toBe('financialAsset');
  })
})