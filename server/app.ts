import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import morgan from 'morgan'
import passport from 'passport'
import PassportJwt from 'passport-jwt'
import path from 'path'
import DBConnect from './dbConfigs'
import User from './models/User'
import router from './router'
import initScript from './util/initScript'
import { IUserDocument } from './types/user.type'
import { forceDomain } from 'forcedomain'

// env variables
dotenv.config()

const app: Express = express()

// middlewares
app.use(morgan('dev'))
app.set('trust proxy', 1)
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use(express.json({ limit: '500kb' }))
app.use(express.urlencoded({ extended: false }))

// passport
declare global {
  namespace Express {
    interface User extends IUserDocument {}
  }
}

app.use(passport.initialize())
const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
}
passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err: any, user: IUserDocument) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    })
  })
)

// database
DBConnect.dbConnection()

// routing
app.use('/api', router)

// force domain and https
app.use(
  forceDomain({
    hostname: 'cornellrsvp.com',
    protocol: 'https',
    excludeRule: /[a-zA-Z0-9][a-zA-Z0-9-]+\.herokuapp\.com/i,
  })
)

// serve static files from client
const isDev = path.dirname(__dirname) === 'server'
const clientBuild = `${isDev ? '' : '../'}../client/dist`
app.use(express.static(path.join(__dirname, clientBuild)))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, clientBuild, 'index.html'))
})

// listen at port
const port: number = Number(process.env.PORT) || 4001
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port: ${port}`)
})

// run initialization script
initScript()
