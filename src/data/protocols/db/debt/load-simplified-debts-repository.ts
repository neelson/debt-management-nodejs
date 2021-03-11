import { SimplifiedDebtModel } from '@/domain/models/simplified-debt'

export interface LoadSimplifiedDebtsRepository {
  loadSimplifiedDebts: () => Promise<SimplifiedDebtModel[]>
}
