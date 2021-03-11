import { AddDebtParams } from '@/domain/usecases/debt/add-debt'
import { DebtModel } from '@/domain/models/debt'

export interface AddDebtRepository {
  add: (data: AddDebtParams) => Promise<DebtModel>
}
