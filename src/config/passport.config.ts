import * as express from 'express'
import session = require('express-session')
import passport = require('passport')

export default (app: express.Express) => {
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'This is ma little secret',
    }),
  ) // TODO: fix
  app.use(passport.initialize())
  app.use(passport.session())
}
