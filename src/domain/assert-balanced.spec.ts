import { assertTransactionBalanced } from "./assert-balanced";
import { EntryType, TransactionPayload } from "./ledger.types";
import { UnbalancedTransactionError } from "./ledger.errors";

describe('assertTransactionBalanced', () => {
  it('does not throw when entries are balanced', () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-100',
      tenantId: 'tenant-1',
      currency: 'USD',
      entries: [
        { accountId: 'acc-1', amount: 2500n, type: EntryType.DEBIT },
        { accountId: 'acc-2', amount: 2500n, type: EntryType.CREDIT }
      ],
    };

    expect(() => assertTransactionBalanced(payload)).not.toThrow();
  });

  it('throws UnbalancedTransactionError with correct values when entries do not balance', () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-101',
      tenantId: 'tenant-1',
      currency: 'USD',
      entries: [
        { accountId: 'acc-1', amount: 3000n, type: EntryType.DEBIT },
        { accountId: 'acc-2', amount: 2000n, type: EntryType.CREDIT },
      ],
    };

    expect(() => assertTransactionBalanced(payload)).toThrow(UnbalancedTransactionError);
  })
})