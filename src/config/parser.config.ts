import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import * as express from 'express'

export default (app: express.Express) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
}
