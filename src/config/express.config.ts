import * as express from 'express'
import * as logger from 'morgan'
import databaseConfig from './database.config'
import parserConfig from './parser.config'
import passportConfig from './passport.config'
import routesConfig from './routes.config'
import staticConfig from './static.config'

export default function() {
  const app: express.Express = express()

  databaseConfig(app)
  app.use(logger('dev'))
  parserConfig(app)
  passportConfig(app)
  staticConfig(app)
  routesConfig(app)

  return app
}
