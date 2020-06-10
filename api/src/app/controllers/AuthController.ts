import { Request, Response } from 'express'
import User from '../models/User'
import JWTService from '../services/JWTService'
import HashService from '../services/HashService'

interface CreateAuth {
  email: string
  password: string
}

class AuthController {
  public async store (request: Request<{}, {}, CreateAuth>, response: Response): Promise<Response> {
    const { email, password } = request.body

    const user = await User.findOne({
      email
    })

    if (!user) {
      return response.status(401).json({
        error: 'USER_NOT_FOUND',
        message: 'The user not found'
      })
    }

    const verify = await HashService.verify(password, user!.password_hash)

    if (!verify) {
      return response.status(401).json({
        error: 'USER_PASSWORD_DONT_MATCH',
        message: 'The passwords do not match'
      })
    }

    const token = await JWTService.sign({
      id: user!._id
    })

    return response.status(200).json({
      token: token,
      type: 'Bearer'
    })
  }
}

export default new AuthController()
