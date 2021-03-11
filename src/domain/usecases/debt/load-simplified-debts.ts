import { SimplifiedDebtModel } from '@/domain/models/simplified-debt'

export interface LoadSimplifiedDebts {
  loadSimplifiedDebts: () => Promise<SimplifiedDebtModel[]>
}
