import { ObjectIdValidator } from '@/validation/protocols/object-id-validator'

export class ObjectIdValidatorSpy implements ObjectIdValidator {
  isObjectIdValid = true
  uuid: string

  isValid (uuid: string): boolean {
    this.uuid = uuid
    return this.isObjectIdValid
  }
}
