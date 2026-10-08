import { TransactionPayload, TransactionReceipt } from "../types/ledger.types";

export const LEDGER_REPOSITORY_TOKEN = Symbol('LEDGER_REPOSITORY');

export interface LedgerRepository {
  saveTransaction(payload: TransactionPayload): Promise<TransactionReceipt>;

  getAccountBalance(tenantId: string, accountId: string): Promise<bigint>;

  existsByTransanctionId(tenantId: string, transactionId: string): Promise<boolean>;
}