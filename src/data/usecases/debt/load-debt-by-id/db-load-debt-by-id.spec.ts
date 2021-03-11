import { DbLoadDebtById } from './db-load-debt-by-id'
import { LoadDebtByIdRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadDebtById
  loadDebtByIdRepositorySpy: LoadDebtByIdRepositorySpy
}

const fakeId = faker.random.uuid()
const makeSut = (): SutTypes => {
  const loadDebtByIdRepositorySpy = new LoadDebtByIdRepositorySpy()
  const sut = new DbLoadDebtById(loadDebtByIdRepositorySpy)
  return {
    sut,
    loadDebtByIdRepositorySpy
  }
}

describe('DbLoadDebtsByUserId Usecase', () => {
  test('Should call LoadDebtsByUserIdRepository with correct values', async () => {
    const { sut, loadDebtByIdRepositorySpy } = makeSut()
    await sut.loadDebtById(fakeId)
    expect(loadDebtByIdRepositorySpy.id).toBe(fakeId)
  })

  test('Should return null if LoadDebtsByUserIdRepository returns null', async () => {
    const { sut, loadDebtByIdRepositorySpy } = makeSut()
    loadDebtByIdRepositorySpy.debtModel = null
    const account = await sut.loadDebtById(fakeId)
    expect(account).toBeNull()
  })

  test('Should return an debt on success', async () => {
    const { sut, loadDebtByIdRepositorySpy } = makeSut()
    const debt = await sut.loadDebtById(fakeId)
    expect(debt).toEqual(loadDebtByIdRepositorySpy.debtModel)
  })

  test('Should throw if LoadDebtsByUserIdRepository throws', async () => {
    const { sut, loadDebtByIdRepositorySpy } = makeSut()
    jest.spyOn(loadDebtByIdRepositorySpy, 'loadDebtById').mockImplementationOnce(throwError)
    const promise = sut.loadDebtById(fakeId)
    await expect(promise).rejects.toThrow()
  })
})
