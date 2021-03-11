import { AddDebt, AddDebtParams, DebtModel, AddDebtRepository } from './db-add-debt-protocols'

export class DbAddDebt implements AddDebt {
  constructor (
    private readonly addDebtRepository: AddDebtRepository
  ) {}

  async add (debtData: AddDebtParams): Promise<DebtModel> {
    const newDebt = await this.addDebtRepository.add(debtData)
    return newDebt
  }
}
