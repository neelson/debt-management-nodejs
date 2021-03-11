import { LoadDebtsByUserId } from '@/domain/usecases/debt/load-debts-by-user-id'
import { DbLoadDebtsByUserId } from '@/data/usecases/debt/load-debts-by-user-id/db-load-debts-by-user-id'
import { DebtMongoRepository } from '@/infra/db/mongodb/debt/debt-mongo-repository'

export const makeDbLoadDebtsByUserId = (): LoadDebtsByUserId => {
  const debtsMongoRepository = new DebtMongoRepository()
  return new DbLoadDebtsByUserId(debtsMongoRepository)
}
