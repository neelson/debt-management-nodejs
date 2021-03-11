import { Controller, HttpRequest, HttpResponse, DeleteDebt } from './delete-debt-controller-protocols'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class DeleteDebtController implements Controller {
  constructor (
    private readonly deleteDebt: DeleteDebt
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.deleteDebt.delete(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
