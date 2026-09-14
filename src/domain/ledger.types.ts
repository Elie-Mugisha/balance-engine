export enum EntryType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export interface LedgerEntry {
  readonly accountId: string;
  readonly amount: bigint;
  readonly type: EntryType
}

export interface TransactionPayload {
  readonly transactionId: string;
  readonly tenantId: string;
  readonly currency: string;
  readonly entries: readonly LedgerEntry[]
}