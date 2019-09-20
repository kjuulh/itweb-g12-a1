import * as express from 'express'
import * as path from 'path'
import sassConfig from './sass.config'

export default (app: express.Express) => {

  app.set('views', path.join(__dirname, '../../src/views'))
  app.set('view engine', 'pug')

  sassConfig(app)

  // provide static assets form public
  app.use(express.static(path.join(__dirname, '../../src/public')))

  // Using bootstrap
  app.use(
    '/stylesheets',
    express.static(
      path.join(__dirname, '../../node_modules/bootstrap/dist/css'),
    ),
  )
  app.use(
    '/stylesheets',
    express.static(
      path.join(__dirname, '../../node_modules/@fortawesome'),
    ),
  )
  app.use(
    '/scripts',
    express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')),
  )
}
