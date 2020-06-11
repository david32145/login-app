import { Request, Response } from 'express'
import Form from '../models/Form'
import FormResponse from '../models/FormResponse'
import { Types } from 'mongoose'

interface FormResponseCreate {
  responses: Record<string, string>
}

class UserController {
  public async store (request: Request<{id: string}, {}, FormResponseCreate>, response: Response): Promise<Response> {
    const { responses } = request.body
    const form_id = String(request.params.id)

    if (!Types.ObjectId.isValid(form_id)) {
      return response.status(404).json({
        error: 'FORM_NOT_FOUND',
        message: 'The form is not found'
      })
    }

    const exists = await Form.exists({ _id: form_id })
    if (!exists) {
      return response.status(404).json({
        error: 'FORM_NOT_FOUND',
        message: 'The form is not found'
      })
    }

    const answers = Object.keys(responses).map(key => ({
      label: key,
      value: responses[key]
    }))

    const formResponse = await FormResponse.create({
      answers,
      form_id
    })

    await Form.updateOne({ _id: form_id }, {
      $push: {
        responses: formResponse._id
      }
    })

    return response.status(201).json(formResponse.toJSON())
  }
}

export default new UserController()
