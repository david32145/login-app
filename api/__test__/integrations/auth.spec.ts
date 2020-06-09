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

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(expect.objectContaining({
      token: 'token'
    }))
  })
})
