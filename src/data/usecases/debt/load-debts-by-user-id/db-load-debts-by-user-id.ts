import { LoadDebtsByUserIdRepository, LoadDebtsByUserId, DebtModel } from './db-load-debts-by-user-id-protocols'

export class DbLoadDebtsByUserId implements LoadDebtsByUserId {
  constructor (
    private readonly loadDebtByUserIDRepository: LoadDebtsByUserIdRepository
  ) {}

  async loadDebtsByUserId (userId: string): Promise<DebtModel[]> {
    const debts = await this.loadDebtByUserIDRepository.loadDebtsByUserId(userId)
    return debts
  }
}
