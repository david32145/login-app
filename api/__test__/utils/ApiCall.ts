import supertest from 'supertest'
import JWTService from '../../src/app/services/JWTService'
import app from '../../src/app'

export default supertest(app)

export async function createToken (id: string): Promise<string> {
  const token = await JWTService.sign({ id })
  return token
}
