import { DebtModel } from '@/domain/models/debt'

export type SaveDebtParams = {
  id: string,
  userId: string,
  description: string,
  value: number,
  date: Date
}

export interface SaveDebt {
  save: (data: SaveDebtParams) => Promise<DebtModel>
}
