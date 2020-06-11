import { assert } from 'chai'
import ApiCall, { createToken } from '../utils/ApiCall'
import * as UserFaker from '../utils/faker/UserFaker'
import * as FormFaker from '../utils/faker/FormFaker'
import MongoMock from '../utils/mongoose'
import Form, { Field } from '../../src/app/models/Form'
import { FormAnswer } from '../../src/app/models/FormResponse'

beforeAll(async () => {
  await MongoMock.connect()
})

beforeEach(async () => {
  await MongoMock.dropDatabase()
})

afterAll(async () => {
  await MongoMock.disconnect()
})

describe('Form Response', () => {
  it('Should be create an response of an form', async () => {
    const user = await UserFaker.makeInstance({
      email: 'nascimento32145@gmail.com'
    })
    const token = await createToken(user._id)

    const fields: Field[] = [{
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
      type: 'SELECT',
      options: ['BANANA', 'APPLE', 'ORANGE']
    }]

    const form = await FormFaker.makeInstance({
      user_id: user._id,
      fields
    })

    const formAnswers = {
      Name: 'David',
      Bio: 'An student of programming',
      Genre: 'MALE',
      'Favorite fruite': 'Banana'
    }

    const response = await ApiCall
      .post(`/forms/${form._id}/responses`)
      .send({
        responses: formAnswers
      })
      .set('authorization', `Bearer ${token}`)

    assert.equal(response.status, 201)
    assert.propertyVal(response.body, 'form_id', String(form._id))
    const answers = response.body.answers.reduce((acc: Record<string, string>, answer: FormAnswer) => {
      acc[answer.label] = answer.value
      return acc
    }, {})
    assert.deepEqual(answers, formAnswers)
    assert.property(response.body, '_id')
    assert.property(response.body, 'created_at')
    assert.property(response.body, 'updated_at')
    assert.property(response.body, '__v')
    const formResponse = await Form.findOne({ _id: form._id })
      .select('responses')
    assert.include(formResponse?.responses, response.body._id, 'Form have an new answer')
  })

  it('Should be not create an response of an form that not exists', async () => {
    const user = await UserFaker.makeInstance({
      email: 'nascimento32145@gmail.com'
    })
    const token = await createToken(user._id)

    const response = await ApiCall
      .post('/forms/64/responses')
      .send()
      .set('authorization', `Bearer ${token}`)

    assert.equal(response.status, 404)
    assert.propertyVal(response.body, 'error', 'FORM_NOT_FOUND')
    assert.propertyVal(response.body, 'message', 'The form is not found')
  })

  it('Should be not create an response of an form with bad answer', async () => {
    const user = await UserFaker.makeInstance({
      email: 'nascimento32145@gmail.com'
    })
    const token = await createToken(user._id)

    const fields: Field[] = [{
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
      type: 'SELECT',
      options: ['BANANA', 'APPLE', 'ORANGE']
    }]

    const form = await FormFaker.makeInstance({
      user_id: user._id,
      fields
    })

    const formAnswers = {
      Name: 'David'
    }

    const response = await ApiCall
      .post(`/forms/${form._id}/responses`)
      .send({
        responses: formAnswers
      })
      .set('authorization', `Bearer ${token}`)

    assert.equal(response.status, 400)
  })
})
