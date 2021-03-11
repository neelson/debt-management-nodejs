import { DbLoadDebtsByUserId } from './db-load-debts-by-user-id'
import { LoadDebtsByUserIdRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadDebtsByUserId
  loadDebtsByUserIdRepositorySpy: LoadDebtsByUserIdRepositorySpy
}

const fakeUserId = faker.random.uuid()
const makeSut = (): SutTypes => {
  const loadDebtsByUserIdRepositorySpy = new LoadDebtsByUserIdRepositorySpy()
  const sut = new DbLoadDebtsByUserId(loadDebtsByUserIdRepositorySpy)
  return {
    sut,
    loadDebtsByUserIdRepositorySpy
  }
}

describe('DbLoadDebtsByUserId Usecase', () => {
  test('Should call LoadDebtsByUserIdRepository with correct values', async () => {
    const { sut, loadDebtsByUserIdRepositorySpy } = makeSut()
    await sut.loadDebtsByUserId(fakeUserId)
    expect(loadDebtsByUserIdRepositorySpy.userId).toBe(fakeUserId)
  })

  test('Should return null if LoadDebtsByUserIdRepository returns null', async () => {
    const { sut, loadDebtsByUserIdRepositorySpy } = makeSut()
    loadDebtsByUserIdRepositorySpy.debtModel = null
    const account = await sut.loadDebtsByUserId(fakeUserId)
    expect(account).toBeNull()
  })

  test('Should return an debt on success', async () => {
    const { sut, loadDebtsByUserIdRepositorySpy } = makeSut()
    const debt = await sut.loadDebtsByUserId(fakeUserId)
    expect(debt).toEqual(loadDebtsByUserIdRepositorySpy.debtModel)
  })

  test('Should throw if LoadDebtsByUserIdRepository throws', async () => {
    const { sut, loadDebtsByUserIdRepositorySpy } = makeSut()
    jest.spyOn(loadDebtsByUserIdRepositorySpy, 'loadDebtsByUserId').mockImplementationOnce(throwError)
    const promise = sut.loadDebtsByUserId(fakeUserId)
    await expect(promise).rejects.toThrow()
  })
})
