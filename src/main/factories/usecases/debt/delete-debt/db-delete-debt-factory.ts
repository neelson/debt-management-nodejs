import { DbDeleteDebt } from '@/data/usecases/debt/delete-debt/db-delete-debt'
import { DeleteDebt } from '@/domain/usecases/debt/delete-debt'
import { DebtMongoRepository } from '@/infra/db/mongodb/debt/debt-mongo-repository'

export const makeDbDeleteDebt = (): DeleteDebt => {
  const debtMongoRepository = new DebtMongoRepository()
  return new DbDeleteDebt(debtMongoRepository)
}
