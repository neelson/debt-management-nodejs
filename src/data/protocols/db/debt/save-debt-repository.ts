import { SaveDebtParams } from '@/domain/usecases/debt/save-debt'

export interface SaveDebtRepository {
  save: (data: SaveDebtParams) => Promise<void>
}
