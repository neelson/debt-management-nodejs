import { makeSaveDebtValidation } from './save-debt-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbSaveDebt } from '@/main/factories/usecases/debt/save-debt/db-save-debt-factory'
import { makeDbLoadDebtById } from '@/main/factories/usecases/debt/load-debt-by-id/db-load-debt-by-id-factory'
import { Controller } from '@/presentation/protocols'
import { SaveDebtController } from '@/presentation/controllers/debt/save-debt/save-debt-controller'

export const makeSaveDebtController = (): Controller => {
  const controller = new SaveDebtController(makeSaveDebtValidation(), makeDbLoadDebtById() ,makeDbSaveDebt())
  return makeLogControllerDecorator(controller)
}
