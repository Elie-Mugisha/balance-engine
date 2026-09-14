import { TransactionPayload } from "./ledger.types";
import { calculateLedgerBalance } from "./ledger.validator";
import { UnbalancedTransactionError } from "./ledger.errors";

export function assertTransactionBalanced(payload: TransactionPayload): void {
  const result = calculateLedgerBalance(payload.entries);

  if (!result.isBalanced) {
    throw new UnbalancedTransactionError(result.totalDebits, result.totalCredits)
  }
}