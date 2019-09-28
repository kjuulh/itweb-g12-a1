import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'
import { authGuard } from '../middleware/auth.middleware.server'

export default class IndexRoute {
  constructor(app: Express) {
    app.route('/').get(indexController.index)
    app.route('/index').get(indexController.index)
    app.route('/about').get(indexController.about)
  }
}
