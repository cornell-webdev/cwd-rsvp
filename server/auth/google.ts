import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import dotenv from 'dotenv'
import User from '../models/User'
import path from 'path'

// dev dotenv path
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

passport.use(new GoogleStrategy({
  clientID: process.env.ID_GOOGLE as string,
  clientSecret: process.env.SECRET_GOOGLE as string,
  callbackURL: `${process.env.SERVER_DOMAIN}/api/public/auth/google/callback`,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ providerId: profile.id })
    const providerData = {
      ...profile,
      accessToken,
      refreshToken,
    }

    if (user) {
      // update providerData
      await User.findByIdAndUpdate(user._id, { providerData })

      return done(null, user)
    }
    const userData = { authProvider: 'google', providerId: profile.id, providerData }
    const newUser = await new User(userData).save()
    return done(null, newUser)
  } catch (error) {
    return done(error, null)
  }
}))

export default passport
