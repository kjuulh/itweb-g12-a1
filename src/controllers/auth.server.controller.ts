import { Request, Response } from 'express'
import passport = require('passport')
import { User } from '../models/user.model'

export default class AuthenticationController {

  public login(req: Request, res: Response, next: Function): void {
    res.render('login', { title: 'Login', message: req.flash('loginMessage') })
  }

  public signup(req: Request, res: Response, next: Function): void {
    res.render('signup', { title: 'Signup', message: req.flash('signupMessage') })
  }
}

export const authController = new AuthenticationController()
