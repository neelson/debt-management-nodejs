import { SimplifiedDebtModel, LoadSimplifiedDebts, LoadSimplifiedDebtsRepository } from './db-load-simplified-debts-protocols'

export class DbLoadSimplifiedDebts implements LoadSimplifiedDebts {
  constructor (
    private readonly loadSimplifiedDebtsRepository: LoadSimplifiedDebtsRepository
  ) {}

  async loadSimplifiedDebts (): Promise<SimplifiedDebtModel[]> {
    const debts = await this.loadSimplifiedDebtsRepository.loadSimplifiedDebts()
    return debts
  }
}
