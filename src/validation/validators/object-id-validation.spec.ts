import { ObjectIdValidation } from './object-id-validation'
import { ObjectIdValidatorSpy } from '@/validation/test'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'
import { throwError } from '@/domain/test'

const field = faker.random.word()

type SutTypes = {
  sut: ObjectIdValidation
  objectIdValidatorSpy: ObjectIdValidatorSpy
}

const makeSut = (): SutTypes => {
  const objectIdValidatorSpy = new ObjectIdValidatorSpy()
  const sut = new ObjectIdValidation(field, objectIdValidatorSpy)
  return {
    sut,
    objectIdValidatorSpy
  }
}

describe('ObjectId Validation', () => {
  test('Should return an error if ObjectIdValidator returns false', () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    objectIdValidatorSpy.isObjectIdValid = false
    const email = faker.random.uuid()
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call ObjectIdValidator with correct uuid', () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    const uuid = faker.random.uuid()
    sut.validate({ [field]: uuid })
    expect(objectIdValidatorSpy.uuid).toBe(uuid)
  })

  test('Should throw if ObjectIdValidator throws', () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    jest.spyOn(objectIdValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
