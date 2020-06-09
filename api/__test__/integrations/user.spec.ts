import { assert } from 'chai'
import ApiCall from '../utils/ApiCall'
import MongoMock from '../utils/mongoose'

beforeAll(async () => {
  console.log(process.env.NODE_ENV)
  await MongoMock.connect()
})

afterAll(async () => {
  await MongoMock.disconnect()
})

describe('User Resource', () => {
  it('It should be create an new user', async () => {
    const response = await ApiCall
      .post('/users')
      .send({
        name: 'David',
        bio: 'My bio',
        email: 'nascimento32145@gmail.com',
        password: '123'
      })

    assert.equal(response.status, 201)
    assert.propertyVal(response, 'name', 'David')
    assert.propertyVal(response, 'bio', 'My bio')
    assert.propertyVal(response, 'email', 'nascimento32145@gmail.com')
    assert.propertyVal(response, 'forms', [])
    assert.property(response, '_id')
    assert.property(response, 'created_at')
    assert.property(response, 'update_at')
    assert.property(response, '_v')
  })
})
