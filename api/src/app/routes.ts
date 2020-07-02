import { Router } from 'express'

import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

import AuthMiddleware from './middleware/AuthMiddleware'

import UserValidator from './validators/UserValidator'

const routes = Router()

routes
  .post('/auth', AuthController.store)

routes
  .post('/users', UserValidator.validate, UserController.store)

routes
  .use(AuthMiddleware.handler)

export default routes
