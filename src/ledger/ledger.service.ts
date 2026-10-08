import { Inject, Injectable } from "@nestjs/common";
import { TransactionPayload, TransactionReceipt } from "../domain/types/ledger.types";
import { ValidateBalanced } from "../common/decorators/validate-balanced.decorator";
import { LedgerRepository, LEDGER_REPOSITORY_TOKEN } from "../domain/repositories/ledger.repository.interface";

@Injectable()
export class LedgerService {
  constructor(
    @Inject(LEDGER_REPOSITORY_TOKEN)
    private readonly ledgerRepository: LedgerRepository,
  ) { }
  
  @ValidateBalanced()
  public async postTransaction(payload: TransactionPayload): Promise<TransactionReceipt> {
    return this.ledgerRepository.saveTransaction(payload);
  }

  public async getBalance(
    tenantId: string,
    accountId: string
  ): Promise<bigint> {
    return this.ledgerRepository.getAccountBalance(tenantId, accountId)
  }
}