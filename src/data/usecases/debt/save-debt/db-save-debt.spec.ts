import { DbSaveDebt } from './db-save-debt'
import { SaveDebtRepositorySpy, LoadDebtByIdRepositorySpy } from '@/data/test'
import { mockSaveDebtParams, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbSaveDebt
  saveDebtRepositorySpy: SaveDebtRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveDebtRepositorySpy = new SaveDebtRepositorySpy()
  const loadDebtRepositorySpy = new LoadDebtByIdRepositorySpy()
  const sut = new DbSaveDebt(saveDebtRepositorySpy, loadDebtRepositorySpy)
  return {
    sut,
    saveDebtRepositorySpy
  }
}

describe('DbSaveDebt Usecase', () => {
  test('Should call SaveDebtRepository with correct values', async () => {
    const { sut, saveDebtRepositorySpy } = makeSut()
    const saveDebtParams = mockSaveDebtParams()
    await sut.save(saveDebtParams)
    expect(saveDebtRepositorySpy.saveDebtParams).toEqual({
      id: saveDebtParams.id,
      userId: saveDebtParams.userId,
      description: saveDebtParams.description,
      date: saveDebtParams.date,
      value: saveDebtParams.value
    })
  })

  test('Should throw if SaveDebtRepository throws', async () => {
    const { sut, saveDebtRepositorySpy } = makeSut()
    jest.spyOn(saveDebtRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveDebtParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an debt on success', async () => {
    const { sut, saveDebtRepositorySpy } = makeSut()
    const debt = await sut.save(mockSaveDebtParams())
    expect(debt).toEqual(saveDebtRepositorySpy.debtModel)
  })
})
