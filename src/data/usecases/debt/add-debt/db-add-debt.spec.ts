import { DbAddDebt } from './db-add-debt'
import { AddDebtRepositorySpy } from '@/data/test'
import { mockDebtModel, mockAddDebtParams, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAddDebt
  addDebtRepositorySpy: AddDebtRepositorySpy
}

const makeSut = (): SutTypes => {
  const addDebtRepositorySpy = new AddDebtRepositorySpy()
  const sut = new DbAddDebt(addDebtRepositorySpy)
  return {
    sut,
    addDebtRepositorySpy
  }
}

describe('DbAddDebt Usecase', () => {
  test('Should call AddDebtRepository with correct values', async () => {
    const { sut, addDebtRepositorySpy } = makeSut()
    const addDebtParams = mockAddDebtParams()
    await sut.add(addDebtParams)
    expect(addDebtRepositorySpy.addDebtParams).toEqual({
      userId: addDebtParams.userId,
      description: addDebtParams.description,
      date: addDebtParams.date,
      value: addDebtParams.value
    })
  })

  test('Should throw if AddDebtRepository throws', async () => {
    const { sut, addDebtRepositorySpy } = makeSut()
    jest.spyOn(addDebtRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddDebtParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an debt on success', async () => {
    const { sut, addDebtRepositorySpy } = makeSut()
    const debt = await sut.add(mockAddDebtParams())
    expect(debt).toEqual(addDebtRepositorySpy.debtModel)
  })

})
