import { Request, Response } from 'express'
import { model } from 'mongoose'
import { Example } from '../models/example.model'

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    var request = new Example({
      name: req.url,
    })
    request.save()
    res.render('index', { title: 'Home' })
  }

  public about(req: Request, res: Response, next: Function): void {
    res.render('about', { title: 'About' })
  }
}

export const indexController = new IndexController()
