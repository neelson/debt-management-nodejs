import { makeSaveDebtValidation } from './save-debt-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddDebtValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveDebtValidation()
    const validations: Validation[] = []
    for (const field of ['description', 'date', 'value']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
