import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

let debtCollection: Collection

describe('Debt Routes', () => {
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

  describe('POST /debts', () => {
    test('Should return 400 on add debt without any params', async () => {
      await request(app)
        .post('/api/debts')
        .send()
        .expect(400)
    })

    test('Should return 204 on add debt', async () => {
      await request(app)
        .post('/api/debts')
        .send({
          description: faker.random.words(),
          userId: faker.random.uuid(),
          date: faker.date.future(),
          value: faker.random.number()
        })
        .expect(204)
    })
  })

//   describe('GET /debts', () => {
//     test('Should return 403 on load debts without accessToken', async () => {
//       await request(app)
//         .get('/api/debts')
//         .expect(403)
//     })

//     test('Should return 204 on load debts with valid accessToken', async () => {
//       const accessToken = await mockAccessToken()
//       await request(app)
//         .get('/api/debts')
//         .set('x-access-token', accessToken)
//         .expect(204)
//     })
//   })
})
