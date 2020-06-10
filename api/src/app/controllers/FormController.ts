import { Request, Response } from 'express'
import User from '../models/User'
import Form, { Field } from '../models/Form'

interface FormCreate {
  title: string
  description: string
  theme: string
  fields: Field[]
}

class UserController {
  public async store (request: Request<{}, {}, FormCreate>, response: Response): Promise<Response> {
    const { title, description, theme, fields } = request.body
    const form = await Form.create({
      title,
      description,
      theme,
      fields,
      user_id: request.user_id!
    })

    await User.updateOne({ _id: request.user_id! }, {
      $push: {
        forms: form._id
      }
    })

    return response.status(201).json(form.toJSON())
  }
}

export default new UserController()
