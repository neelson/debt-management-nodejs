import { SaveDebt, SaveDebtParams, DebtModel, SaveDebtRepository, LoadDebtByIdRepository } from './db-save-debt-protocols'

export class DbSaveDebt implements SaveDebt {
  constructor (
    private readonly saveDebtRepository: SaveDebtRepository,
    private readonly loadDebtByIdRepository: LoadDebtByIdRepository
  ) {}

  async save (data: SaveDebtParams): Promise<DebtModel> {
    await this.saveDebtRepository.save(data)
    const debt = await this.loadDebtByIdRepository.loadDebtById(data.id)
    return debt
  }
}
