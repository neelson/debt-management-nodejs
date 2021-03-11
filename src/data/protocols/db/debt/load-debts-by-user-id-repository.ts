import { DebtModel } from '@/domain/models/debt'

export interface LoadDebtsByUserIdRepository {
  loadDebtsByUserId: (userId: string) => Promise<DebtModel[]>
}
