import { assert } from 'chai'
import ApiCall from '../utils/ApiCall'
import * as UserFaker from '../utils/faker/UserFaker'
import MongoMock from '../utils/mongoose'

beforeAll(async () => {
  await MongoMock.connect()
})

beforeEach(async () => {
  await MongoMock.dropDatabase()
})

afterAll(async () => {
  await MongoMock.disconnect()
})

describe('Authenticate', () => {
  it('Should be return an jwt token', async () => {
    const user = await UserFaker.makeInstance({
      password: '123',
      email: 'nascimento32145@gmail.com'
    })
    const response = await ApiCall
      .post('/auth')
      .send({
        email: user.email,
        password: '123'
      })

    assert.equal(response.status, 200)
    assert.property(response.body, 'token')
    assert.propertyVal(response.body, 'type', 'Bearer')
  })

  it('Should be not return an jwt token with an password do not match', async () => {
    const user = await UserFaker.makeInstance({
      password: '123',
      email: 'nascimento32145@gmail.com'
    })
    const response = await ApiCall
      .post('/auth')
      .send({
        email: user.email,
        password: '1234'
      })

    assert.equal(response.status, 401)
    assert.propertyVal(response.body, 'error', 'USER_PASSWORD_DONT_MATCH')
    assert.propertyVal(response.body, 'message', 'The passwords do not match')
  })

  it('Should be not return an jwt token of an user that not exists', async () => {
    const response = await ApiCall
      .post('/auth')
      .send({
        email: 'user@not.found',
        password: 'potato'
      })

    assert.equal(response.status, 401)
    assert.propertyVal(response.body, 'error', 'USER_NOT_FOUND')
    assert.propertyVal(response.body, 'message', 'The user not found')
  })
})
