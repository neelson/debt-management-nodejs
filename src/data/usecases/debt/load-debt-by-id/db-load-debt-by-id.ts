import { LoadDebtByIdRepository, LoadDebtById, DebtModel } from './db-load-debt-by-id-protocols'

export class DbLoadDebtById implements LoadDebtById {
  constructor (
    private readonly loadDebtByIdRepository: LoadDebtByIdRepository
  ) {}

  async loadDebtById (id: string): Promise<DebtModel> {
    const debt = await this.loadDebtByIdRepository.loadDebtById(id)
    return debt
  }
}
