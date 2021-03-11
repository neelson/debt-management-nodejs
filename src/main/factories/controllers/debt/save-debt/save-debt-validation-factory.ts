import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeSaveDebtValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['description', 'date', 'value']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
