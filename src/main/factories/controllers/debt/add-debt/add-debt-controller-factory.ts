import { makeAddDebtValidation } from './add-debt-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddDebt } from '@/main/factories/usecases/debt/add-debt/db-add-debt-factory'
import { Controller } from '@/presentation/protocols'
import { AddDebtController } from '@/presentation/controllers/debt/add-debt/add-debt-controller'

export const makeAddDebtController = (): Controller => {
  const controller = new AddDebtController(makeAddDebtValidation(), makeDbAddDebt())
  return makeLogControllerDecorator(controller)
}
