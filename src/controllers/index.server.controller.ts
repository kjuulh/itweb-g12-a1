import { Request, Response } from 'express'
import { model } from 'mongoose'
import { Example } from '../models/example.model'

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    console.log('Saving message to db')
    var request = new Example({
      name: req.url,
    })
    request.save()
    res.render('index', { title: 'Workout program' })
  }
}

export const indexController = new IndexController()
