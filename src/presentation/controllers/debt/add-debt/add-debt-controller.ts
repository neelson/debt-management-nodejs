import { Controller, HttpRequest, HttpResponse, Validation, AddDebt } from './add-debt-controller-protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'

export class AddDebtController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDebt: AddDebt
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { userId, description, date, value } = httpRequest.body
      const debt = await this.addDebt.add({
        userId,
        description,
        date,
        value
      })

      return ok(debt)
    } catch (error) {
      return serverError(error)
    }
  }
}
