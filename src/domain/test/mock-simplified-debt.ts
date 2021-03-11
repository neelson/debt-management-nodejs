import { DebtModel } from '@/domain/models/debt'
import { SimplifiedDebtModel } from '@/domain/models/simplified-debt'
import faker from 'faker'


export const mockSimplifiedDebtsModels = (): SimplifiedDebtModel[] => ([{
  userId: faker.random.uuid(),
  value: faker.random.number()
}])

