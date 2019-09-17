import * as express from 'express'

import flash = require('connect-flash')

export default (app: express.Express) => {
  app.use(flash())
}
