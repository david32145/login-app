import { Response, Request, NextFunction } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string()
    .min(3, 'The name must have at least 3 letters')
    .max(30, 'The name must have a maximum of 30 letter')
    .required('The name is required'),
  bio: yup.string()
    .min(5, 'The bio must have at least 5 letters')
    .max(100, 'The bio must have a maximum of 100 letter'),
  email: yup.string()
    .email('The email is invalid')
    .required('The email is required'),
  password: yup.string()
    .min(7, 'The password must have at least 7 letters')
    .max(20, 'The password must have a maximum of 20 letter')
    .required('The password is required')
})

class UserValidator {
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

export default new UserValidator()
