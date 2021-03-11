import { SaveDebtController } from './save-debt-controller'
import { HttpRequest } from '@/presentation/protocols'
import { serverError, badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { SaveDebtSpy, ValidationSpy, LoadDebtByIdSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'

const mockRequest = (): HttpRequest => ({
  body: {
    userId: faker.random.uuid(),
    description: faker.random.words(),
    value: faker.random.number(),
    date: faker.date.future()
  },
  params: { id: faker.random.uuid() }
})

type SutTypes = {
  sut: SaveDebtController
  validationSpy: ValidationSpy
  loadDebtByIdSpy: LoadDebtByIdSpy
  saveDebtSpy: SaveDebtSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveDebtSpy = new SaveDebtSpy()
  const loadDebtByIdSpy = new LoadDebtByIdSpy()
  const sut = new SaveDebtController(validationSpy, loadDebtByIdSpy, saveDebtSpy)
  return {
    sut,
    validationSpy,
    loadDebtByIdSpy,
    saveDebtSpy
  }
}

describe('SaveDebt Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if debt no exist', async () => {
    const { sut, loadDebtByIdSpy } = makeSut()
    jest.spyOn(loadDebtByIdSpy, 'loadDebtById').mockReturnValue(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
  })


  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call SaveDebt with correct values', async () => {
    const { sut, saveDebtSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(saveDebtSpy.saveDebtModelParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if SaveDebt throws', async () => {
    const { sut, saveDebtSpy } = makeSut()
    jest.spyOn(saveDebtSpy, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(ok({}).statusCode)
  })
})
