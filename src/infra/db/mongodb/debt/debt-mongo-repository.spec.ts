import { DebtMongoRepository } from './debt-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddDebtParams, mockDebtModel } from '@/domain/test'
import { Collection } from 'mongodb'
import { DebtModel } from '@/domain/models/debt'
import { ObjectId } from 'mongodb'
import faker from 'faker'

let debtCollection: Collection

describe('DebtMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    debtCollection = await MongoHelper.getCollection('debts')
    await debtCollection.deleteMany({})
  })

  const makeSut = (): DebtMongoRepository => {
    return new DebtMongoRepository()
  }

  describe('add()', () => {
    test('Should return an debt on success', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddDebtParams()
      const debt = await sut.add(addDebtParams)
      expect(debt).toBeTruthy()
      expect(debt.id).toBeTruthy()
      expect(debt.description).toBe(addDebtParams.description)
      expect(debt.userId).toBe(addDebtParams.userId)
      expect(debt.value).toBe(addDebtParams.value)
      expect(debt.date).toBe(addDebtParams.date)
    })
  })

  describe('delete()', () => {
    test('Should delete an debt on success', async () => {
      const sut = makeSut()
      
      const res = await debtCollection.insertOne(mockAddDebtParams())
      const fakeDebt = res.ops[0]

      await sut.delete(fakeDebt._id)

      const debt = await debtCollection.findOne({ _id: fakeDebt._id })
      expect(debt).toBeFalsy()
    })
  })


  describe('loadSimplifiedDebts()', () => {
    test('Should return an debts on success', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddDebtParams()
      await debtCollection.insertOne(addDebtParams)
      const simflifiedDebts = await sut.loadSimplifiedDebts()
      expect(simflifiedDebts).toBeTruthy()
      expect(simflifiedDebts[0].value).toBe(addDebtParams.value)
      expect(simflifiedDebts[0].userId).toBe(addDebtParams.userId)
    })
  })

  describe('loadDebtsByUserId()', () => {
    test('Should return an debts on success using userId', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddDebtParams()
      await debtCollection.insertOne(addDebtParams)


      const debt = await sut.loadDebtsByUserId(addDebtParams.userId)

      expect(debt).toBeTruthy()
      expect(debt[0].value).toBe(addDebtParams.value)
      expect(debt[0].userId).toBe(addDebtParams.userId)
    })
  })

  describe('loadDebtById()', () => {
    test('Should return an debt on success using id', async () => {
      const sut = makeSut()
      const addDebtParams = mockAddDebtParams()
      await debtCollection.insertOne(addDebtParams)

      const res = await debtCollection.insertOne(mockAddDebtParams())
      const fakeDebt = res.ops[0]
      const debt = await sut.loadDebtById(fakeDebt._id)

      // expect(debt).toBeTruthy()
      // expect(debt[0].value).toBe(addDebtParams.value)
      // expect(debt[0].userId).toBe(addDebtParams.userId)
    })
  })

  describe('save()', () => {
    test('Should update the debt on success', async () => {
      const sut = makeSut()
      const res = await debtCollection.insertOne(mockAddDebtParams())
      const fakeDebt = res.ops[0]
      const newDescription = faker.random.words()
      const updateDebt = {...fakeDebt, description: newDescription};
      await sut.save(updateDebt)

      const newValues = await debtCollection.findOne({ _id: fakeDebt._id })
      // expect(newValues).toBeTruthy()
      // expect(newValues.description).toBe(newDescription)
    })
  })

})
