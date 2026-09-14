import { EntryType, LedgerEntry } from "./ledger.types";

export interface BalanceCheckResult {
  readonly isBalanced: boolean;
  readonly totalDebits: bigint;
  readonly totalCredits: bigint;
}

export function calculateLedgerBalance(entries: readonly LedgerEntry[]): BalanceCheckResult {
  let totalDebits = 0n;
  let totalCredits = 0n;

  for (const entry of entries) {
    if (entry.type === EntryType.DEBIT) {
      totalDebits += entry.amount;
    } else if (entry.type === EntryType.CREDIT) {
      totalCredits += entry.amount
    }
  }

  return {
    isBalanced: totalDebits === totalCredits,
    totalDebits,
    totalCredits
  }
}