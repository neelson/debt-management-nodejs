import { DbLoadSimplifiedDebts } from './db-load-simplified-debts'
import { LoadSimplifiedDebtsRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadSimplifiedDebts
  loadSimplifiedDebtsRepositorySpy: LoadSimplifiedDebtsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSimplifiedDebtsRepositorySpy = new LoadSimplifiedDebtsRepositorySpy()
  const sut = new DbLoadSimplifiedDebts(loadSimplifiedDebtsRepositorySpy)
  return {
    sut,
    loadSimplifiedDebtsRepositorySpy
  }
}

describe('DbLoadSimplifiedDebts Usecase', () => {
  test('Should throw if LoadSimplifiedDebtsRepository throws', async () => {
    const { sut, loadSimplifiedDebtsRepositorySpy } = makeSut()
    jest.spyOn(loadSimplifiedDebtsRepositorySpy, 'loadSimplifiedDebts').mockImplementationOnce(throwError)
    const promise = sut.loadSimplifiedDebts()
    await expect(promise).rejects.toThrow()
  })

  test('Should return an debt on success', async () => {
    const { sut, loadSimplifiedDebtsRepositorySpy } = makeSut()
    const debt = await sut.loadSimplifiedDebts()
    expect(debt).toEqual(loadSimplifiedDebtsRepositorySpy.debtModel)
  })

})
