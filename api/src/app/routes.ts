import { Router } from 'express'

import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
import FormController from './controllers/FormController'

import AuthMiddleware from './middleware/AuthMiddleware'

import UserValidator from './validators/UserValidator'
import FormValidator from './validators/FormValidator'

const routes = Router()

routes
  .post('/auth', AuthController.store)

routes
  .post('/users', UserValidator.validate, UserController.store)

routes
  .use(AuthMiddleware.handler)
  .post('/forms', FormValidator.validate, FormController.store)

export default routes
