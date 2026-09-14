import { TransactionPayload } from "../types/ledger.types";
import { calculateLedgerBalance } from "./ledger.validator";
import { UnbalancedTransactionError } from "../errors/ledger.errors";

export function assertTransactionBalanced(payload: TransactionPayload): void {
  const result = calculateLedgerBalance(payload.entries);

  if (!result.isBalanced) {
    throw new UnbalancedTransactionError(result.totalDebits, result.totalCredits)
  }
}