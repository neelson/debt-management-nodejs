import { MongoHelper } from '../helpers/mongo-helper'
import { AddDebtParams } from '@/domain/usecases/debt/add-debt'
import { DebtModel } from '@/domain/models/debt'
import { SimplifiedDebtModel } from '@/domain/models/simplified-debt'
import { AddDebtRepository } from '@/data/protocols/db/debt/add-debt-repository'
import { LoadDebtByIdRepository } from '@/data/protocols/db/debt/load-debt-by-id-repository'
import { LoadDebtsByUserIdRepository } from '@/data/protocols/db/debt/load-debts-by-user-id-repository'
import { LoadSimplifiedDebtsRepository } from '@/data/protocols/db/debt/load-simplified-debts-repository'
import { SaveDebtRepository } from '@/data/protocols/db/debt/save-debt-repository'
import { DeleteDebtRepository } from '@/data/protocols/db/debt/delete-debt-repository'
import { SaveDebtParams } from '@/domain/usecases/debt/save-debt'
import { QueryBuilder } from '../helpers'
import { ObjectId } from 'mongodb'

export class DebtMongoRepository implements AddDebtRepository, SaveDebtRepository, LoadDebtByIdRepository, DeleteDebtRepository, LoadSimplifiedDebtsRepository, LoadDebtsByUserIdRepository {
  
  async loadDebtsByUserId (userId: string): Promise<DebtModel[]> {
    const debtCollection = await MongoHelper.getCollection('debts')
    const debts = await debtCollection.find({ userId }).toArray()
    return debts
  }

  async delete (id: string): Promise<void> {
    const debtCollection = await MongoHelper.getCollection('debts')
    const debtId = new ObjectId(id)
    await debtCollection.deleteOne({'_id': debtId})
  }

  async save (data: SaveDebtParams): Promise<void> {
    const debtCollection = await MongoHelper.getCollection('debts')
    const debtId = new ObjectId(data.id)
    await debtCollection.findOneAndUpdate({
      _id: debtId
    }, {
      $set: {
        description: data.description,
        date: data.date,
        value: data.value,
      }
    }, {
      upsert: false
    })
  }

  async add (data: AddDebtParams): Promise<DebtModel> {
    const debtCollection = await MongoHelper.getCollection('debts')
    const result = await debtCollection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async loadDebtById (id: string): Promise<DebtModel> {
    const debtCollection = await MongoHelper.getCollection('debts')
    const debtId = new ObjectId(id)
    const debt = await debtCollection.findOne({ '_id': debtId })
    return debt && MongoHelper.map(debt)
  }

  async loadSimplifiedDebts (): Promise<SimplifiedDebtModel[]> {

    const surveyResultCollection = await MongoHelper.getCollection('debts')
    const query = new QueryBuilder()
      .group({
        _id: {userId: '$userId'},
        value: {
          $sum: '$value'
        }
      })
      .project({
        _id: 0,
        userId: '$_id.userId',
        value: '$value'
      })
      .build()
    const debts = await surveyResultCollection.aggregate(query).toArray()
    return debts 
  }
}
