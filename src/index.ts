import * as http from 'http'
import * as express from 'express'
import * as path from 'path'
import config from './config/config'

// tslint:disable-next: no-require-imports
const app = require('./config/express').default()

// Configure server
const server: http.Server = new http.Server(app)

server.listen(8080)

server.on('error', (e: Error) => console.log('Error starting server: ' + e))

server.on('listening', () => {
  console.log(`Server started on port 8080 on env ${process.env.NODE_ENV}`)
})