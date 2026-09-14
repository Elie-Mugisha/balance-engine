import { ValidateBalanced } from "../../../common/decorators/validate-balanced.decorator";
import { EntryType, TransactionPayload } from "../../../domain/types/ledger.types";
import { UnbalancedTransactionError } from "../../../domain/errors/ledger.errors";

class TestLedgerService {
  public executed = false;

  @ValidateBalanced()
  public process(payload: TransactionPayload): string {
    this.executed = true;
    return `Processed: ${payload.transactionId}`;
  }
}

describe(`@ValidateBalanced decorator`, () => {
  let service: TestLedgerService;

  beforeEach(() => {
    service = new TestLedgerService();
  });

  it('allows method execution when the transaction is balanced', () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-100',
      tenantId: 'tenant-1',
      currency: 'USD',
      entries: [
        { accountId: 'acc-1', amount: 1000n, type: EntryType.DEBIT },
        { accountId: 'acc-2', amount: 1000n, type: EntryType.CREDIT }
      ]
    }

    const result = service.process(payload);

    expect(result).toBe('Processed: tx-100');
    expect(service.executed).toBe(true);
  });

  it('intercepts and blocks execution when the transaction is unbalanced', () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-101',
      tenantId: 'tenant-2',
      currency: 'USD',
      entries: [
        { accountId: 'acc-1', amount: 1000n, type: EntryType.DEBIT },
        { accountId: 'acc-2', amount: 500n, type: EntryType.CREDIT }
      ],
    };

    expect(() => service.process(payload)).toThrow(UnbalancedTransactionError);
    expect(service.executed).toBe(false);
  })
})