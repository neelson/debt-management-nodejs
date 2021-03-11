import { DebtModel } from '@/domain/models/debt'

export interface LoadDebtById {
  loadDebtById: (id: string) => Promise<DebtModel>
}
