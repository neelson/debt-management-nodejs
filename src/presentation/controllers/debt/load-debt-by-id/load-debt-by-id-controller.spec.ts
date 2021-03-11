import { LoadDebtByIdController } from './load-debt-by-id-controller'
import { HttpRequest } from './load-debt-by-id-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadDebtByIdSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ params: { userId: faker.random.uuid()} })

type SutTypes = {
  sut: LoadDebtByIdController
  loadDebtByIdSpy: LoadDebtByIdSpy
}

const makeSut = (): SutTypes => {
  const loadDebtByIdSpy = new LoadDebtByIdSpy()
  const sut = new LoadDebtByIdController(loadDebtByIdSpy)
  return {
    sut,
    loadDebtByIdSpy
  }
}

describe('LoadDebtById Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadDebtById with correct value', async () => {
    const { sut, loadDebtByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadDebtByIdSpy.id).toBe(httpRequest.params.id)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadDebtByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadDebtByIdSpy.debtModel))
  })

  test('Should return 204 if LoadDebtById returns empty', async () => {
    const { sut, loadDebtByIdSpy } = makeSut()
    loadDebtByIdSpy.debtModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadDebtById throws', async () => {
    const { sut, loadDebtByIdSpy } = makeSut()
    jest.spyOn(loadDebtByIdSpy, 'loadDebtById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
