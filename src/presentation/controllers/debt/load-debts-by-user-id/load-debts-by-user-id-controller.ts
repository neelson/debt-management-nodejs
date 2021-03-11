import { Controller, HttpRequest, HttpResponse, LoadDebtsByUserId } from './load-debts-by-user-id-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class LoadDebtsByUserIdController implements Controller {
  constructor (private readonly loadDebtsByUserId: LoadDebtsByUserId) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params
      const debts = await this.loadDebtsByUserId.loadDebtsByUserId(userId)
      return debts.length ? ok(debts) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
