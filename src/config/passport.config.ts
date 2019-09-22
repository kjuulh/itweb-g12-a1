import * as crypto from 'crypto'
import * as express from 'express'
import session = require('express-session')
import passport = require('passport')
import * as passportLocal from 'passport-local'
import * as passportRememberMe from 'passport-remember-me'
import { Token } from '../models/remember-me-tokens.model'
import { IUser, User } from '../models/user.model'

export default (app: express.Express) => {
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: 'This is ma little secret',
      cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    }),
  ) // TODO: fix
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user: IUser, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(
    'local-signup',
    new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ email }, (err, user) => {
          if (err) {
            return done(err)
          }

          if (user) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That email is already taken'),
            )
          } else {
            const newUser = new User()

            newUser.email = email
            newUser.password = newUser.generateHash(password)
            newUser.firstName = req.body.firstName
            newUser.lastName = req.body.lastName

            newUser.save(err => {
              if (err) {
                throw err
              }
              return done(null, newUser)
            })
          }
        })
      },
    ),
  )

  passport.use(
    'local-login',
    new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ email }, (err, user: IUser) => {
          if (err) {
            return done(err)
          }

          if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user found'))
          }

          if (!user.validateHash(password)) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'Wrong username or password'),
            )
          }

          return done(null, user)
        })
      },
    ),
  )

  passport.use(new passportRememberMe.Strategy(
      (token, done) => {
        Token.findOneAndDelete(token,  (err, tokenRes) => {
          const userId = tokenRes.userId
          if (err) {
            return done(err)
          }
          if (!userId) {
            return done(null, false)
          }

          User.findById(userId, (err, user) => {
            if (err) {
              return done(err)
            }
            if (!user) {
              return done(null, false)
            }
            return done(null, user)
          })
        })
      },
      (user, done) => {
        crypto.randomBytes(64, (err, buf) => {
          const token = new Token({
            value: buf.toString('hex'),
            userId: user._id,
          })
          token.save(err => {
            if (err) {
              return done(err)
            }
            return done(null, token)
          })
        })
      },
    ),
  )
}
