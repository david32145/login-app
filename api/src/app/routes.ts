import { Router } from 'express'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

const routes = Router()

routes
  .post('/auth', AuthController.store)

routes
  .post('/users', UserController.store)

export default routes
