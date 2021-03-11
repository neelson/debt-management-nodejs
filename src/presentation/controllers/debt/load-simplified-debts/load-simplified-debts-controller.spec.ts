import { HttpRequest } from '@/presentation/protocols'
import { LoadSimplifiedDebtsController } from './load-simplified-debts-controller'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LoadSimplifiedDebtsSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadSimplifiedDebtsController
  loadSimplifiedDebtsSpy: LoadSimplifiedDebtsSpy
}

const mockRequest = (): HttpRequest => ({})


const makeSut = (): SutTypes => {
  const loadSimplifiedDebtsSpy = new LoadSimplifiedDebtsSpy()
  const sut = new LoadSimplifiedDebtsController(loadSimplifiedDebtsSpy)
  return {
    sut,
    loadSimplifiedDebtsSpy
  }
}

describe('LoadSimplifiedDebts Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return 500 if LoadSimplifiedDebts throws', async () => {
    const { sut, loadSimplifiedDebtsSpy } = makeSut()
    jest.spyOn(loadSimplifiedDebtsSpy, 'loadSimplifiedDebts').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(ok({}).statusCode)
  })
})
