import { Request, Response } from 'express'

interface UserCreate {
  name: string
  bio?: string
  email: string
  password: string
  avatar_uri?: string
}

class UserController {
  public async store (request: Request<{}, {}, UserCreate>, response: Response): Promise<Response> {
    return response.send(request.user_id)
  }
}

export default new UserController()
