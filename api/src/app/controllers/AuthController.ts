import { Request, Response } from 'express'

interface CreateAuth {
  email: string
  password: string
}

class AuthController {
  public async store (request: Request<{}, {}, CreateAuth>, response: Response): Promise<Response> {
    const { email, password } = request.body
    return response.status(200).json({
      token: 'token',
      type: 'Bearer'
    })
  }
}

export default new AuthController()
