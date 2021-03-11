import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddDebtValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['description', 'userId', 'date', 'value']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
