import { Response, Request, NextFunction } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string()
    .min(3, 'The title must have at least 3 letters')
    .max(30, 'The title must have a maximum of 30 letter')
    .required('The title is required'),
  description: yup.string()
    .min(5, 'The description must have at least 5 letters')
    .max(100, 'The description must have a maximum of 100 letter')
    .required('The description is required'),
  theme: yup.string()
    .required('The theme is required'),
  fields: yup.array()
    .of(yup.object().shape({
      label: yup.string()
        .required('The fields.label is required'),
      type: yup.string()
        .oneOf(['TEXT_FIELD', 'TEXT_AREA', 'SELECT', 'RADIO'], 'The types is invalid')
        .required('The fields.type is required'),
      options: yup.array()
        .of(yup.string())
    }))
    .required('The fields is required')
    .min(1, 'The form must have at least 1 question')
})

class FormValidator {
  public async validate (request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    const body = request.body
    try {
      await schema.validate(body, {
        abortEarly: false,
        stripUnknown: true
      })
      return next()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.map(error => ({
          path: error.path,
          message: error.message
        }))

        return response.status(400).json({
          error: 'BAD_FIELDS',
          message: 'The fields was bad',
          context: 'body',
          errors
        })
      }
      return response.status(500).send()
    }
  }
}

export default new FormValidator()
