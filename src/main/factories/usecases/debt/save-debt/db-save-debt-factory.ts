import { DbSaveDebt } from '@/data/usecases/debt/save-debt/db-save-debt'
import { SaveDebt } from '@/domain/usecases/debt/save-debt'
import { DebtMongoRepository } from '@/infra/db/mongodb/debt/debt-mongo-repository'

export const makeDbSaveDebt = (): SaveDebt => {
  const debtMongoRepository = new DebtMongoRepository()
  return new DbSaveDebt(debtMongoRepository, debtMongoRepository)
}
