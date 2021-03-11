import { DebtModel } from '@/domain/models/debt'

export interface LoadDebtByIdRepository {
  loadDebtById: (id: string) => Promise<DebtModel>
}
