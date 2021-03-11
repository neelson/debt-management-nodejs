import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddDebtController } from '@/main/factories/controllers/debt/add-debt/add-debt-controller-factory'
import { makeSaveDebtController } from '@/main/factories/controllers/debt/save-debt/save-debt-controller-factory'
import { makeDeleteDebtController } from '@/main/factories/controllers/debt/delete-debt/delete-debt-controller-factory'
import { makeLoadDebtsByUserIdController } from '@/main/factories/controllers/debt/load-debts-by-user-id/load-debts-by-user-id-controller-factory'
import { makeLoadSimplifiedDebtsController } from '@/main/factories/controllers/debt/load-simplified-debts/load-simplified-debts-controller-factory'
import { makeLoadDebtByIdController } from '@/main/factories/controllers/debt/load-debts-by-id/load-debts-by-id-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/user/:userId/debts', adaptRoute(makeLoadDebtsByUserIdController()))
  router.get('/debt/:id', adaptRoute(makeLoadDebtByIdController()))
  router.get('/debts', adaptRoute(makeLoadSimplifiedDebtsController()))
  router.post('/debt', adaptRoute(makeAddDebtController()))
  router.put('/debt/:id', adaptRoute(makeSaveDebtController()))
  router.delete('/debt/:id', adaptRoute(makeDeleteDebtController()))
}
