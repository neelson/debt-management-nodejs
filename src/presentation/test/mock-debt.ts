import { AddDebt, AddDebtParams } from '@/domain/usecases/debt/add-debt'
import { DeleteDebt } from '@/domain/usecases/debt/delete-debt'
import { SaveDebt, SaveDebtParams } from '@/domain/usecases/debt/save-debt'
import { LoadDebtsByUserId } from '@/domain/usecases/debt/load-debts-by-user-id'
import { LoadDebtById } from '@/domain/usecases/debt/load-debt-by-id'
import { LoadSimplifiedDebts } from '@/domain/usecases/debt/load-simplified-debts'
import { DebtModel } from '@/domain/models/debt'
import { mockDebtModel, mockDebtModels, mockSaveDebtParams } from '@/domain/test'
import { SimplifiedDebtModel } from '@/domain/models/simplified-debt'

export class AddDebtSpy implements AddDebt {
  debtModel = mockDebtModel()
  addDebtParams: AddDebtParams

  async add (account: AddDebtParams): Promise<DebtModel> {
    this.addDebtParams = account
    return this.debtModel
  }
}

export class LoadDebtsByUserIdSpy implements LoadDebtsByUserId {
  debtModel = mockDebtModels()
  userId: string

  async loadDebtsByUserId (userId: string): Promise<DebtModel[]> {
    this.userId = userId
    return this.debtModel
  }
}

export class LoadDebtByIdSpy implements LoadDebtById {
  debtModel = mockDebtModel()
  id: string

  async loadDebtById (id: string): Promise<DebtModel> {
    this.id = id
    return this.debtModel
  }
}

export class LoadSimplifiedDebtsSpy implements LoadSimplifiedDebts {
  debtModel = mockDebtModels()
  async loadSimplifiedDebts (): Promise<SimplifiedDebtModel[]> {
    return this.debtModel
  }
}

export class DeleteDebtSpy implements DeleteDebt {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }
}

export class SaveDebtSpy implements SaveDebt {
  saveDebtModelParams = mockSaveDebtParams()
  debtModel = mockDebtModel()
  async save (data: SaveDebtParams): Promise<DebtModel> {
    this.saveDebtModelParams = data
    return this.debtModel
  }
}