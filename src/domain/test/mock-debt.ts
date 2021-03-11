import { DebtModel } from '@/domain/models/debt'
import { AddDebtParams } from '@/domain/usecases/debt/add-debt'
import { SaveDebtParams } from '@/domain/usecases/debt/save-debt'
import faker from 'faker'

export const mockAddDebtParams = (): AddDebtParams => ({
  userId: faker.random.uuid(),
  description: faker.random.words(),
  date: faker.date.future(),
  value: faker.random.number()
})

export const mockSaveDebtParams = (): SaveDebtParams => ({
  id: faker.random.uuid(),
  userId: faker.random.uuid(),
  description: faker.random.words(),
  date: faker.date.future(),
  value: faker.random.number()
})

export const mockDebtModel = (): DebtModel => ({
  id: faker.random.uuid(),
  userId: faker.random.uuid(),
  description: faker.random.words(),
  date: faker.date.future(),
  value: faker.random.number()
})

export const mockDebtModels = (): DebtModel[] => ([{
  id: faker.random.uuid(),
  userId: faker.random.uuid(),
  description: faker.random.words(),
  date: faker.date.future(),
  value: faker.random.number()
}])

