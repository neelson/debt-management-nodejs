import { DbDeleteDebt } from './db-delete-debt'
import { DeleteDebtRepositorySpy } from '@/data/test'
import { mockDebtModel, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbDeleteDebt
  deleteDebtRepositorySpy: DeleteDebtRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteDebtRepositorySpy = new DeleteDebtRepositorySpy()
  const sut = new DbDeleteDebt(deleteDebtRepositorySpy)
  return {
    sut,
    deleteDebtRepositorySpy
  }
}

describe('DbAddDebt Usecase', () => {
  test('Should call deleteDebtRepository with correct value', async () => {
    const { sut, deleteDebtRepositorySpy } = makeSut()
    const id = mockDebtModel().id
    await sut.delete(id)
    expect(deleteDebtRepositorySpy.id).toEqual(id)
  })

  test('Should throw if DeleteDebtRepository throws', async () => {
    const { sut, deleteDebtRepositorySpy } = makeSut()
    jest.spyOn(deleteDebtRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const id = mockDebtModel().id
    const promise = sut.delete(id)
    await expect(promise).rejects.toThrow()
  })
})
