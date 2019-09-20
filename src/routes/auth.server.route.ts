import { Express } from 'express'
import passport = require('passport')
import { authController } from '../controllers/auth.server.controller'

export default class AuthRoutes {
  constructor(app: Express) {
    app.route('/login').get(authController.login)
    app.route('/login').post(passport.authenticate('local-login', {
      successRedirect: '/index',
      failureRedirect: '/login',
      failureFlash: true,
    }))
    app.route('/signup').get(authController.signup)
    app.route('/signup').post(passport.authenticate('local-signup', {
      successRedirect: '/login',
      failureRedirect: '/signup',
      failureFlash: true,
    }))
    app.route('/logout').get(authController.logout)
  }
}
