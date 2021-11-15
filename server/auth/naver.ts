import passport from 'passport'
import { Strategy as NaverStrategy } from 'passport-naver'
import dotenv from 'dotenv'
import User from '../models/User'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

/*
https://developers.naver.com/main/

1. navbar > application > 애플리케이션 등록
callback url 은 `${process.env.SERVER_DOMAIN}/api/public/auth/naver/callback`

2. 검수
로고 등록 후 검수를 통과해야지 네아로 사용 가능
검수 전에는 "개발중" 상태로 모든 네이버 계정으로 로그인 불가능
*/

passport.use(new NaverStrategy({
  clientID: process.env.ID_NAVER,
  clientSecret: process.env.SECRET_NAVER,
  callbackURL: `${process.env.SERVER_DOMAIN}/api/public/auth/naver/callback`,
  // authType: 'reauthenticate', // reauthenticate previously signed in users (optional)
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ providerId: profile.id })

    if (user) {
      // update providerData
      await User.findByIdAndUpdate(user._id, { providerData: profile })

      return done(null, user)
    }
    const userData = { authProvider: 'naver', providerId: profile.id, providerData: profile }
    const newUser = await new User(userData).save()
    return done(null, newUser)
  } catch (error) {
    return done(error, null)
  }
}))

export default passport
