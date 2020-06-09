import { assert } from 'chai'
import ApiCall from '../utils/ApiCall'
import MongoMock from '../utils/mongoose'

beforeAll(async () => {
  await MongoMock.connect()
})

afterAll(async () => {
  await MongoMock.disconnect()
})

describe('Authenticate', () => {
  it('Should be return an jwt token', async () => {
    const response = await ApiCall.post('/auth')

    assert.equal(response.status, 200)
    assert.property(response.body, 'token')
    assert.propertyVal(response.body, 'type', 'Bearer')
  })
})
