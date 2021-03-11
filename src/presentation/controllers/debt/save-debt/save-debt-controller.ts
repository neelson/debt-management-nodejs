import { Controller, HttpRequest, HttpResponse, Validation, SaveDebt, LoadDebtById } from './save-debt-controller-protocols'
import { serverError, ok, badRequest } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveDebtController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadDebtById: LoadDebtById,
    private readonly saveDebt: SaveDebt
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      
      const debt = await this.loadDebtById.loadDebtById(id)
      if (!debt) {
        return badRequest(new InvalidParamError('id'))
      }

      const { description, date, value, userId } = httpRequest.body

      const debtResult = await this.saveDebt.save({
        id,
        userId,
        description,
        date,
        value
      })
      return ok(debtResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
