import { Express } from 'express'
import { authController } from '../controllers/auth.server.controller'

export default class AuthRoutes {
  constructor(app: Express) {
    app.route('/login').get(authController.login)
    app.route('/login').post(authController.login)
    app.route('/signup').get(authController.signup)
  }
}
