import { Request, Response } from 'express';

export const setIsLoggedIn = (request: Request, response: Response, next: Function) => {
  response.locals.isLoggedIn = request.isAuthenticated()
  next()
}

export const authGuard = (request: Request, response: Response, next: Function) => {
  if (request.isAuthenticated()) {
    next()
  } else {
  response.redirect('/login')
  }
}
