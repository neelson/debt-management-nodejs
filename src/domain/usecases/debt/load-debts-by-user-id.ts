import { DebtModel } from '@/domain/models/debt'

export interface LoadDebtsByUserId {
  loadDebtsByUserId: (userId: string) => Promise<DebtModel[]>
}
