import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteDebt } from '@/main/factories/usecases/debt/delete-debt/db-delete-debt-factory'
import { Controller } from '@/presentation/protocols'
import { DeleteDebtController } from '@/presentation/controllers/debt/delete-debt/delete-debt-controller'

export const makeDeleteDebtController = (): Controller => {
  const controller = new DeleteDebtController(makeDbDeleteDebt())
  return makeLogControllerDecorator(controller)
}
