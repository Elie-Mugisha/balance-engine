export class UnbalancedTransactionError extends Error {
  public readonly name = 'UnbalancedTransactionError';

  constructor(
    public readonly totalDebits: bigint,
    public readonly totalCredits: bigint,
  ) {
    const difference = totalDebits - totalCredits
    super(
      `Transaction balance invariant violated: Debits (${totalDebits.toString()}) != Credits (${totalCredits.toString()}). \n Difference: ${difference}`
    )
    Error.captureStackTrace?.(this, UnbalancedTransactionError)
  }
}