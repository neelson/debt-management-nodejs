import { DbAddDebt } from '@/data/usecases/debt/add-debt/db-add-debt'
import { AddDebt } from '@/domain/usecases/debt/add-debt'
import { DebtMongoRepository } from '@/infra/db/mongodb/debt/debt-mongo-repository'

export const makeDbAddDebt = (): AddDebt => {
  const debtMongoRepository = new DebtMongoRepository()
  return new DbAddDebt(debtMongoRepository)
}
