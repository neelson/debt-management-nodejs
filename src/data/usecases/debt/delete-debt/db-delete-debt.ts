import { DeleteDebt, DeleteDebtRepository } from './db-delete-debt-protocols'

export class DbDeleteDebt implements DeleteDebt {
  constructor (
    private readonly deleteDebtRepository: DeleteDebtRepository
  ) {}

  async delete (id: string): Promise<void> {
    await this.deleteDebtRepository.delete(id)
  }
}
