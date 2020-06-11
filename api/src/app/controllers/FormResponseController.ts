import { Request, Response } from 'express'
import Form from '../models/Form'
import FormResponse from '../models/FormResponse'
import { Types } from 'mongoose'
import { ValidationError } from 'yup'
import FormResponseValidator from '../validators/FormResponseValidator'

interface FormResponseCreate {
  responses: Record<string, string>
}

class UserController {
  public async store (request: Request<{id: string}, {}, FormResponseCreate>, response: Response): Promise<Response> {
    const { responses } = request.body
    const form_id = String(request.params.id)

    //
    if (!Types.ObjectId.isValid(form_id)) {
      return response.status(404).json({
        error: 'FORM_NOT_FOUND',
        message: 'The form is not found'
      })
    }

    const form = await Form.findById(form_id)
    if (!form) {
      return response.status(404).json({
        error: 'FORM_NOT_FOUND',
        message: 'The form is not found'
      })
    }

    const schema = FormResponseValidator(form.fields)

    try {
      await schema.validate(responses, {
        abortEarly: false,
        stripUnknown: true
      })
    } catch (err) {
      if (err instanceof ValidationError) {
        return response.status(400).json({
          error: 'BAD_FIELDS',
          message: 'The fields was invalid for this form',
          paths: err.inner.map(err => ({
            label: err.path,
            message: err.message
          }))
        })
      }
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
