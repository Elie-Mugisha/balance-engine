import { Injectable } from "@nestjs/common";
import { TransactionPayload, TransactionReceipt, TransactionStatus } from "../domain/types/ledger.types";
import { ValidateBalanced } from "../common/decorators/validate-balanced.decorator";

@Injectable()
export class LedgerService {
  @ValidateBalanced()
  public async postTransaction(payload: TransactionPayload): Promise<TransactionReceipt> {
    return {
      transactionId: payload.transactionId,
      tenantId: payload.tenantId,
      status: TransactionStatus.POSTED,
      postedAt: new Date(),
      entryCount: payload.entries.length
    }
  }
}