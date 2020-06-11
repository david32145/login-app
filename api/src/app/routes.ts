import { Router } from 'express'

import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
import FormController from './controllers/FormController'

import AuthMiddleware from './middleware/AuthMiddleware'

import UserValidator from './validators/UserValidator'
import FormValidator from './validators/FormValidator'
import FormResponseController from './controllers/FormResponseController'

const routes = Router()

routes
  .post('/auth', AuthController.store)

routes
  .post('/users', UserValidator.validate, UserController.store)

routes
  .use(AuthMiddleware.handler)
  .post('/forms', FormValidator.validate, FormController.store)
  .post('/forms/:id/responses', FormResponseController.store)

export default routes
