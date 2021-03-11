import { makeAddDebtValidation } from './add-debt-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddDebtValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddDebtValidation()
    const validations: Validation[] = []
    for (const field of ['description', 'userId', 'date', 'value']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
