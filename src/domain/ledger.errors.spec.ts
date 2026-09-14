import { UnbalancedTransactionError } from "./ledger.errors";

describe('UnbalancedTransactionError', () => {
  it('correctly captures totals and formats the error message', () => {
    const error = new UnbalancedTransactionError(5000n, 4000n);

    expect(error.name).toBe('UnbalancedTransactionError');
    expect(error.totalDebits).toBe(5000n);
    expect(error.totalCredits).toBe(4000n);
    expect(error.message).toContain('Debits (5000) != Credits (4000)');
    expect(error.message).toContain('Difference: 1000');
  });

  it('inherits from standard Error', () => {
    const error = new UnbalancedTransactionError(100n, 50n);
    expect(error).toBeInstanceOf(Error);
  })
})