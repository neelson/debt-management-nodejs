import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadDebtById } from '@/main/factories/usecases/debt/load-debt-by-id/db-load-debt-by-id-factory'
import { Controller } from '@/presentation/protocols'
import { LoadDebtByIdController } from '@/presentation/controllers/debt/load-debt-by-id/load-debt-by-id-controller'

export const makeLoadDebtByIdController = (): Controller => {
  const controller = new LoadDebtByIdController(makeDbLoadDebtById())
  return makeLogControllerDecorator(controller)
}
