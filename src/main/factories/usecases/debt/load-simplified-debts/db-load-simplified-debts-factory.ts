import { LoadSimplifiedDebts } from '@/domain/usecases/debt/load-simplified-debts'
import { DbLoadSimplifiedDebts } from '@/data/usecases/debt/load-simplified-debts/db-load-simplified-debts'
import { DebtMongoRepository } from '@/infra/db/mongodb/debt/debt-mongo-repository'

export const makeDbLoadSimplifiedDebts = (): LoadSimplifiedDebts => {
  const debtMongoRepository = new DebtMongoRepository()
  return new DbLoadSimplifiedDebts(debtMongoRepository)
}
