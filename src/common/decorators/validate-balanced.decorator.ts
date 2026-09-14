import { TransactionPayload } from "../../domain/types/ledger.types";
import { assertTransactionBalanced } from "../../domain/validators/assert-balanced";

export function ValidateBalanced() {
  return (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      const payload = args.find(
        (arg): arg is TransactionPayload => typeof arg === 'object'
          && arg !== null && 'entries' in arg && Array.isArray((arg as TransactionPayload).entries)
      );

      if (payload) {
        assertTransactionBalanced(payload);
      }

      return originalMethod.apply(this, args);
    }
  }
}