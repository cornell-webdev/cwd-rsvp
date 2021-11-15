import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import dotenv from 'dotenv'
import User from '../models/User'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

/*
https://developers.facebook.com/apps/

1. create app
2. settings > basic
privacy policy (can use github privacy policy page), data deletion url
app id, secret shown here
add domains to "App Domains"
3. products > Facebook Login > Settings > Valid OAuth Redirect URIs
localhost not accepted here
only prod domains

auth works on localhost if in "development mode"
throws invalid redirectUrl error if in live mode,
bc localhost is not registered as an accepted redirect url
*/

passport.use(new FacebookStrategy({
  clientID: process.env.ID_FACEBOOK,
  clientSecret: process.env.SECRET_FACEBOOK,
  callbackURL: `${process.env.SERVER_DOMAIN}/api/public/auth/facebook/callback`,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ providerId: profile.id })
    if (user) {
      // update providerData
      await User.findByIdAndUpdate(user._id, { providerData: profile })

      return done(null, user)
    }
    const userData = { authProvider: 'facebook', providerId: profile.id, providerData: profile }
    const newUser = await new User(userData).save()
    return done(null, newUser)
  } catch (error) {
    return done(error, null)
  }
}))

export default passport
