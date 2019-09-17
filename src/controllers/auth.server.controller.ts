import { Request, Response } from 'express'

export default class AuthenticationController {
  public login(req: Request, res: Response, next: Function): void {
    if (req.method == 'POST') {
      console.log(req.body)
    }

    res.render('login', { title: 'Login' })
  }

  public signup(req: Request, res: Response, next: Function): void {
    res.render('signup', { title: 'Signup' })
  }
}

export const authController = new AuthenticationController()
