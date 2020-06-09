import { Request, Response } from 'express'
import User from '../models/User'

interface UserCreate {
  name: string
  bio?: string
  email: string
  password: string
  avatar_uri?: string
}

class UserController {
  public async store (request: Request<{}, {}, UserCreate>, response: Response): Promise<Response> {
    const { name, bio, email, password, avatar_uri } = request.body
    const user = await User.create({
      name,
      bio,
      email,
      password_hash: password,
      avatar_uri: avatar_uri || 'http://api.adorable.io/avatars/256/abott@adorable.png'
    })
    return response.status(201).json(user.toJSON())
  }
}

export default new UserController()
