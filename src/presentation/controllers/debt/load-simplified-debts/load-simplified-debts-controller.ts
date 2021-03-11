import { Controller, HttpRequest, HttpResponse, LoadSimplifiedDebts } from './load-simplified-debts-controller-protocols'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'

export class LoadSimplifiedDebtsController implements Controller {
  constructor (
    private readonly loadSimplifiedDebts: LoadSimplifiedDebts
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const debts = await this.loadSimplifiedDebts.loadSimplifiedDebts()
      return ok(debts)
    } catch (error) {
      return serverError(error)
    }
  }
}
