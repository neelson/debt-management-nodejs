import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadDebtsByUserId } from '@/main/factories/usecases/debt/load-debts-by-user-id/db-load-debts-by-user-id-factory'
import { Controller } from '@/presentation/protocols'
import { LoadDebtsByUserIdController } from '@/presentation/controllers/debt/load-debts-by-user-id/load-debts-by-user-id-controller'

export const makeLoadDebtsByUserIdController = (): Controller => {
  const controller = new LoadDebtsByUserIdController(makeDbLoadDebtsByUserId())
  return makeLogControllerDecorator(controller)
}
