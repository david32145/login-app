import { Router } from 'express'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
import FormController from './controllers/FormController'
import AuthMiddleware from './middleware/AuthMiddleware'

const routes = Router()

routes
  .post('/auth', AuthController.store)

routes
  .post('/users', UserController.store)

routes
  .use(AuthMiddleware.handler)
  .post('/forms', FormController.store)

export default routes
