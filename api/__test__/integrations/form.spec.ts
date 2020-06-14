import { assert } from 'chai'
import ApiCall, { createToken } from '../utils/ApiCall'
import User from '../../src/app/models/User'
import * as Userfaker from '../utils/faker/UserFaker'
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

describe('Form', () => {
  it('Should be create an new form', async () => {
    const user = await Userfaker.makeInstance({
      email: 'nascimento32145@gmail.com'
    })
    const token = await createToken(user._id)

    const fields = [{
      label: 'Name',
      type: 'TEXT_FIELD',
      options: []
    }, {
      label: 'Bio',
      type: 'TEXT_AREA',
      options: []
    }, {
      label: 'Genre',
      type: 'RADIO',
      options: ['MALE', 'FEMALE', 'UNDEFINED']
    }, {
      label: 'Favorite fruite',
      type: 'CHECKBOX',
      options: ['BANANA', 'APPLE', 'ORANGE']
    }]

    const data = {
      title: 'My Form',
      description: 'My Description',
      theme: '#f567a5',
      fields
    }

    const response = await ApiCall
      .post('/forms')
      .send(data)
      .set('authorization', `Bearer ${token}`)

    assert.equal(response.status, 201)

    assert.propertyVal(response.body, 'title', 'My Form')
    assert.propertyVal(response.body, 'description', 'My Description')
    assert.propertyVal(response.body, 'theme', '#f567a5')
    assert.property(response.body, 'fields')
    assert.deepEqual(response.body.fields.map((field: Record<string, string>) => (
      {
        label: field.label,
        type: field.type,
        options: field.options
      })), fields)
    assert.propertyVal(response.body, 'user_id', String(user._id))
    assert.property(response.body, '_id')
    assert.property(response.body, 'created_at')
    assert.property(response.body, 'updated_at')
    assert.property(response.body, '__v')

    const reloadUser = await User.findById(user._id)
      .select('forms')
    assert.include(reloadUser?.forms, response.body._id, 'User have an new form')
  })
})
