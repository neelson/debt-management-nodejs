import { HttpRequest } from '@/presentation/protocols'
import { AddDebtController } from './add-debt-controller'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { ValidationSpy, AddDebtSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    description: faker.random.words(),
    value: faker.random.number(),
    date: new Date(),
    userId: faker.random.uuid()
  }
})

type SutTypes = {
  sut: AddDebtController
  validationSpy: ValidationSpy
  addDebtSpy: AddDebtSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addDebtSpy = new AddDebtSpy()
  const sut = new AddDebtController(validationSpy, addDebtSpy)
  return {
    sut,
    validationSpy,
    addDebtSpy
  }
}

describe('AddDebt Controller', () => {
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

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddDebt with correct values', async () => {
    const { sut, addDebtSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addDebtSpy.addDebtParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddDebt throws', async () => {
    const { sut, addDebtSpy } = makeSut()
    jest.spyOn(addDebtSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  // test('Should return 200 on success', async () => {
  //   const { sut } = makeSut()
  //   const httpResponse = await sut.handle(mockRequest())
  //   expect(httpResponse).toEqual(ok())
  // })
})
