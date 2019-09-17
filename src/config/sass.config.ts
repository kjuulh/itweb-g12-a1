import * as express from 'express'
import * as sass from 'node-sass-middleware'
import * as path from 'path'

export default (app: express.Express) => {
// use sass
  app.use(
    sass({
      debug: false,
      dest: path.join(__dirname, '../../src/public/stylesheets'),
      force: true,
      prefix: '/stylesheets',
      src: path.join(__dirname, '../../src/sass'),
    }),
  )
}
