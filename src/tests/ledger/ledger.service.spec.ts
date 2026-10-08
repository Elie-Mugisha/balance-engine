import { LedgerService } from "../../ledger/ledger.service";
import { EntryType, TransactionPayload, TransactionReceipt, TransactionStatus } from "../../domain/types/ledger.types";
import { UnbalancedTransactionError } from "../../domain/errors/ledger.errors";
import { LedgerRepository } from "../../domain/repositories/ledger.repository.interface";

describe('LedgerService', () => {
  let service: LedgerService;
  let mockRepository: jest.Mocked<LedgerRepository>

  beforeEach(() => {
    mockRepository = {
      saveTransaction: jest.fn().mockImplementation(async (payload: TransactionPayload): Promise<TransactionReceipt> => ({
        transactionId: payload.transactionId,
        tenantId: payload.tenantId,
        status: TransactionStatus.POSTED,
        postedAt: new Date(),
        entryCount: payload.entries.length
      })),

      getAccountBalance: jest.fn(),
      existsByTransanctionId: jest.fn().mockResolvedValue(false),
    }
    service = new LedgerService(mockRepository);
  });

  it('successfully posts a balanced transaction and persists it via repository', async () => {
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
    expect(mockRepository.saveTransaction).toHaveBeenCalledWith(payload);
    expect(mockRepository.saveTransaction).toHaveBeenCalledTimes(1);
  });

  it('rejects an unbalanced transaction before reaching the repository', () => {
    const payload: TransactionPayload = {
      transactionId: 'tx-101',
      tenantId: 'tenant-2',
      currency: 'USD',
      entries: [
        { accountId: 'acc-3', amount: 15000n, type: EntryType.DEBIT },
        { accountId: 'acc-4', amount: 10000n, type: EntryType.CREDIT },
      ]
    };

    expect(() => service.postTransaction(payload)).toThrow(UnbalancedTransactionError);
    expect(mockRepository.saveTransaction).not.toHaveBeenCalled();
  })
});