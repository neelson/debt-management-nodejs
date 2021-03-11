import { DebtModel } from '@/domain/models/debt'

export type AddDebtParams = Omit<DebtModel, 'id'>

export interface AddDebt {
  add: (debt: AddDebtParams) => Promise<DebtModel>
}
