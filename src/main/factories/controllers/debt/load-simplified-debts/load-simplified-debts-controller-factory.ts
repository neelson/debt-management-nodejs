import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSimplifiedDebts } from '@/main/factories/usecases/debt/load-simplified-debts/db-load-simplified-debts-factory'
import { Controller } from '@/presentation/protocols'
import { LoadSimplifiedDebtsController } from '@/presentation/controllers/debt/load-simplified-debts/load-simplified-debts-controller'

export const makeLoadSimplifiedDebtsController = (): Controller => {
  const controller = new LoadSimplifiedDebtsController(makeDbLoadSimplifiedDebts())
  return makeLogControllerDecorator(controller)
}
