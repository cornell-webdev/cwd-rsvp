import passport from 'passport'
import { Strategy as KakaoStrategy } from 'passport-kakao'
import dotenv from 'dotenv'
import User from '../models/User'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

/*
https://developers.kakao.com/console/app

1. login with client's kakao account
2. 애플리케이션 추가하기
3. JavaScript 키 = process.env.ID_KAKAO
4. 플랫폼 > 웹 플랫폼 추가, 사이트 도메인 등록
5. 카카오 로그인 > 활성화 설정 ON, redirect URI `${process.env.SERVER_DOMAIN}/api/public/auth/kakao/callback` 등록
6. 동의항목 > 프로필 정보 설정 > 필수 (필요시 수집 체크)
*/

passport.use(new KakaoStrategy({
  clientID: process.env.ID_KAKAO,
  callbackURL: `${process.env.SERVER_DOMAIN}/api/public/auth/kakao/callback`,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ providerId: profile.id })

    if (user) {
      // update providerData
      await User.findByIdAndUpdate(user._id, { providerData: profile })

      return done(null, user)
    }
    const userData = { authProvider: 'kakao', providerId: profile.id, providerData: profile }
    const newUser = await new User(userData).save()
    return done(null, newUser)
  } catch (error) {
    return done(error, null)
  }
}))

export default passport
