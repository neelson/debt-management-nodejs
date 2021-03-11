import { HttpRequest } from '@/presentation/protocols'
import { DeleteDebtController } from './delete-debt-controller'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { DeleteDebtSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ params: { userId: faker.random.uuid()} })

type SutTypes = {
  sut: DeleteDebtController
  deleteDebtSpy: DeleteDebtSpy
}

const makeSut = (): SutTypes => {
  const deleteDebtSpy = new DeleteDebtSpy()
  const sut = new DeleteDebtController(deleteDebtSpy)
  return {
    sut,
    deleteDebtSpy
  }
}

describe('DeleteDebt Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteDebt with correct values', async () => {
    const { sut, deleteDebtSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(deleteDebtSpy.id).toEqual(httpRequest.params.id)
  })

  test('Should return 500 if DeleteDebt throws', async () => {
    const { sut, deleteDebtSpy } = makeSut()
    jest.spyOn(deleteDebtSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
