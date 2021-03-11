import { AddDebtRepository } from '@/data/protocols/db/debt/add-debt-repository'
import { SaveDebtRepository } from '@/data/protocols/db/debt/save-debt-repository'
import { DeleteDebtRepository } from '@/data/protocols/db/debt/delete-debt-repository'
import { LoadDebtsByUserIdRepository } from '@/data/protocols/db/debt/load-debts-by-user-id-repository'
import { LoadSimplifiedDebtsRepository } from '@/data/protocols/db/debt/load-simplified-debts-repository'
import { LoadDebtByIdRepository } from '@/data/protocols/db/debt/load-debt-by-id-repository'
import { AddDebtParams } from '@/domain/usecases/debt/add-debt'
import { SaveDebtParams } from '@/domain/usecases/debt/save-debt'
import { DebtModel } from '@/domain/models/debt'
import { SimplifiedDebtModel } from '../usecases/debt/load-simplified-debts/db-load-simplified-debts-protocols'
import { mockDebtModel, mockDebtModels, mockSimplifiedDebtsModels } from '@/domain/test'

export class AddDebtRepositorySpy implements AddDebtRepository {
  debtModel = mockDebtModel()
  addDebtParams: AddDebtParams

  async add (data: AddDebtParams): Promise<DebtModel> {
    this.addDebtParams = data
    return this.debtModel
  }
}

export class SaveDebtRepositorySpy implements SaveDebtRepository {
  debtModel = mockDebtModel()
  saveDebtParams: SaveDebtParams

  async save (data: SaveDebtParams): Promise<void> {
    this.saveDebtParams = data
  }
}

export class DeleteDebtRepositorySpy implements DeleteDebtRepository {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }
}

export class LoadDebtsByUserIdRepositorySpy implements LoadDebtsByUserIdRepository {
  debtModel = mockDebtModels()
  userId: string

  async loadDebtsByUserId (userId: string): Promise<DebtModel[]> {
    this.userId = userId
    return this.debtModel
  }
}

export class LoadDebtByIdRepositorySpy implements LoadDebtByIdRepository {
  debtModel = mockDebtModel()
  id: string

  async loadDebtById (id: string): Promise<DebtModel> {
    this.id = id
    return this.debtModel
  }
}

export class LoadSimplifiedDebtsRepositorySpy implements LoadSimplifiedDebtsRepository {
  debtModel = mockSimplifiedDebtsModels()

  async loadSimplifiedDebts (): Promise<SimplifiedDebtModel[]> {
    return this.debtModel
  }
}
