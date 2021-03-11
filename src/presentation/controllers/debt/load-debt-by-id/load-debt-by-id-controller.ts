import { Controller, HttpRequest, HttpResponse, LoadDebtById } from './load-debt-by-id-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class LoadDebtByIdController implements Controller {
  constructor (private readonly loadDebtById: LoadDebtById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const debts = await this.loadDebtById.loadDebtById(id)
      return debts ? ok(debts) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
