import { LedgerService } from "../../ledger/ledger.service";
import { EntryType, TransactionPayload, TransactionStatus } from "../../domain/types/ledger.types";
import { UnbalancedTransactionError } from "../../domain/errors/ledger.errors";

describe('LedgerService', () => {
  let service: LedgerService;

  beforeEach(() => {
    service = new LedgerService();
  });

  it('successfully posts a balanced transaction and returns a receipt', async () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-100',
      tenantId: 'tenant-1',
      currency: 'USD',
      entries: [
        { accountId: 'acc-1', amount: 15000n, type: EntryType.DEBIT },
        { accountId: 'acc-2', amount: 15000n, type: EntryType.CREDIT },
      ],
    };

    const receipt = await service.postTransaction(payload);

    expect(receipt.transactionId).toBe('tx-100');
    expect(receipt.tenantId).toBe('tenant-1');
    expect(receipt.status).toBe(TransactionStatus.POSTED);
    expect(receipt.entryCount).toBe(2);
    expect(receipt.postedAt).toBeInstanceOf(Date);
  });

  it('rejects an unbalanced transaction by throwing UnbalancedTransactionError', () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-101',
      tenantId: 'tenant-2',
      currency: 'USD',
      entries: [
        { accountId: 'acc-3', amount: 15000n, type: EntryType.DEBIT },
        { accountId: 'acc-4', amount: 10000n, type: EntryType.CREDIT },
      ]
    };

    expect(() => service.postTransaction(payload)).toThrow(UnbalancedTransactionError)
  })
});