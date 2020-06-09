import { assert } from 'chai'
import ApiCall from '../utils/ApiCall'
import MongoMock from '../utils/mongoose'
import * as UserFaker from '../utils/faker/UserFaker'

beforeAll(async () => {
  await MongoMock.connect()
})

beforeEach(async () => {
  await MongoMock.dropDatabase()
})

afterAll(async () => {
  await MongoMock.disconnect()
})

describe('User Resource', () => {
  it('Should be create an new user', async () => {
    const response = await ApiCall
      .post('/users')
      .send({
        name: 'David',
        bio: 'My bio',
        email: 'nascimento32145@gmail.com',
        password: '123'
      })

    assert.equal(response.status, 201)
    assert.propertyVal(response.body, 'name', 'David')
    assert.propertyVal(response.body, 'bio', 'My bio')
    assert.propertyVal(response.body, 'email', 'nascimento32145@gmail.com')
    assert.property(response.body, '_id')
    assert.property(response.body, 'created_at')
    assert.property(response.body, 'updated_at')
    assert.property(response.body, '__v')
  })

  it('Should be not create a new that already exists', async () => {
    const user = await UserFaker.makeInstance({
      email: 'nascimento32145@gmail.com'
    })

    const newUser = UserFaker.make({
      email: user.email
    })

    const response = await ApiCall
      .post('/users')
      .send(newUser)
    assert.equal(response.status, 400)
    assert.propertyVal(response.body, 'error', 'USER_ALREADY_EXISTS')
    assert.propertyVal(response.body, 'message', 'The user with email already exists')
  })
})
