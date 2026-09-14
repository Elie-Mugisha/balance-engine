import { calculateLedgerBalance } from "./ledger.validator";
import { EntryType, LedgerEntry } from "./ledger.types";

describe('calculateLedgerBalance', () => {
  it('returns balanced for a simple debit-credit pair', () => {
    const entries: readonly LedgerEntry[] = [
      { accountId: 'acc-source', amount: 5000n, type: EntryType.DEBIT },
      { accountId: 'acc-dest', amount: 5000n, type: EntryType.CREDIT },
    ];

    const result = calculateLedgerBalance(entries);

    expect(result.isBalanced).toBe(true);
    expect(result.totalDebits).toBe(5000n);
    expect(result.totalCredits).toBe(5000n);
  });

  it('returns balanced for a multi-entry split', () => {
    const entries: readonly LedgerEntry[] = [
      { accountId: 'acc-customer', amount: 10000n, type: EntryType.DEBIT },
      { accountId: 'acc-vendor', amount: 9500n, type: EntryType.CREDIT },
      { accountId: 'acc-platform-fee', amount: 500n, type: EntryType.CREDIT }
    ];

    const result = calculateLedgerBalance(entries);

    expect(result.isBalanced).toBe(true);
    expect(result.totalDebits).toBe(10000n);
    expect(result.totalCredits).toBe(10000n);
  });

  it('returns unbalanced when Debits and Credits do not match', () => {
    const entries: readonly LedgerEntry[] = [
      { accountId: 'acc-source', amount: 5000n, type: EntryType.CREDIT },
      { accountId: 'acc-dest', amount: 4000n, type: EntryType.DEBIT },
    ];

    const result = calculateLedgerBalance(entries);

    expect(result.isBalanced).toBe(false);
    expect(result.totalCredits).toBe(5000n);
    expect(result.totalDebits).toBe(4000n);
  })
})