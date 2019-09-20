import * as express from 'express'
import {setIsLoggedIn} from '../middleware/auth.middleware.server'

export default (app: express.Express) => {
  app.use(setIsLoggedIn)
}
