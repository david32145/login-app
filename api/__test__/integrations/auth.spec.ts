import ApiCall from '../utils/ApiCall'

describe('Authenticate', () => {
  it('Should be return an jwt token', async () => {
    const response = await ApiCall.get('/')

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(expect.objectContaining({
      token: 'token'
    }))
  })
})
