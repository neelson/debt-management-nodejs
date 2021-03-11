import { LoadDebtsByUserIdController } from './load-debts-by-user-id-controller'
import { HttpRequest } from './load-debts-by-user-id-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadDebtsByUserIdSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ params: { userId: faker.random.uuid()} })

type SutTypes = {
  sut: LoadDebtsByUserIdController
  loadDebtsByUserIdSpy: LoadDebtsByUserIdSpy
}

const makeSut = (): SutTypes => {
  const loadDebtsByUserIdSpy = new LoadDebtsByUserIdSpy()
  const sut = new LoadDebtsByUserIdController(loadDebtsByUserIdSpy)
  return {
    sut,
    loadDebtsByUserIdSpy
  }
}

describe('LoadDebtsByUserId Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadDebtsByUserId with correct value', async () => {
    const { sut, loadDebtsByUserIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadDebtsByUserIdSpy.userId).toBe(httpRequest.params.userId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadDebtsByUserIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadDebtsByUserIdSpy.debtModel))
  })

  test('Should return 204 if LoadDebtsByUserId returns empty', async () => {
    const { sut, loadDebtsByUserIdSpy } = makeSut()
    loadDebtsByUserIdSpy.debtModel = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadDebtsByUserId throws', async () => {
    const { sut, loadDebtsByUserIdSpy } = makeSut()
    jest.spyOn(loadDebtsByUserIdSpy, 'loadDebtsByUserId').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
