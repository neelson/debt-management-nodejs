import { LoadDebtById } from '@/domain/usecases/debt/load-debt-by-id'
import { DbLoadDebtById } from '@/data/usecases/debt/load-debt-by-id/db-load-debt-by-id'
import { DebtMongoRepository } from '@/infra/db/mongodb/debt/debt-mongo-repository'

export const makeDbLoadDebtById = (): LoadDebtById => {
  const debtsMongoRepository = new DebtMongoRepository()
  return new DbLoadDebtById(debtsMongoRepository)
}
