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
    const userExists = await User.exists({ email })
    if (userExists) {
      return response.status(400).json({
        error: 'USER_ALREADY_EXISTS',
        message: 'The user with email already exists'
      })
    }
    const user = await User.create({
      name,
      bio,
      email,
      password_hash: password,
      avatar_uri: avatar_uri || 'http://api.adorable.io/avatars/256/abott@adorable.png'
    })
    user.password_hash = '*****'
    return response.status(201).json(user.toJSON({}))
  }
}

export default new UserController()
