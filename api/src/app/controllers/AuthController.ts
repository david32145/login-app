import { Request, Response } from 'express'

class AuthController {
  public async store (request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      token: 'token'
    })
  }
}

export default new AuthController()
