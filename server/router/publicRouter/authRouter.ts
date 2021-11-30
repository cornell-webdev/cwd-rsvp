import express from 'express'
import User from '../../models/User'
import jwt from 'jsonwebtoken'
import passportGoogle from '../../auth/google'
// import passportKakao from '../../auth/kakao'
// import passportNaver from '../../auth/naver'
// import passportFacebook from '../../auth/facebook'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      const newUser = await new User({ ...req.body, provider: 'email' }).save()
      if (!process.env.AUTH_SECRET) throw new Error('Auth secret environment variable is undefined')
      const token = jwt.sign({ _id: newUser._id }, process.env.AUTH_SECRET)
      res.send({ ...newUser.toObject(), token })
    } else {
      res.status(500).send('User already exists')
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

// authRouter.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })
//     if (user) {
//       if (user.validatePassword(password)) {
//         const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET)
//         res.send({ ...user.toObject(), token })
//       } else {
//         throw new Error('Incorrect password')
//       }
//     } else {
//       throw new Error('User does not exist')
//     }
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

/* FACEBOOK */
// router.post('/facebook', passportFacebook.authenticate('facebook', { session: false }));

// router.get('/facebook/callback',
//   passportFacebook.authenticate('facebook', { failureRedirect: '/failure-redirect' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/users');
//   });

/* GOOGLE */
authRouter.get(
  '/google',
  // @ts-ignore
  passportGoogle.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    accessType: 'offline',
    prompt: 'consent',
  })
)

authRouter.get(
  '/google/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: '/google-failure-redirect',
    session: false,
  }),
  (req, res) => {
    // @ts-ignore
    const token = jwt.sign({ _id: req.user._id }, process.env.AUTH_SECRET)
    res.redirect(`${process.env.CLIENT_DOMAIN}/auth/callback?token=${token}`)
  }
)

// /* KAKAO */
// authRouter.get('/kakao', passportKakao.authenticate('kakao'))

// authRouter.get(
//   '/kakao/callback',
//   passportKakao.authenticate('kakao', {
//     failureRedirect: '/kakao-failure-redirect',
//     session: false,
//   }),
//   (req, res) => {
//     // @ts-ignore
//     const token = jwt.sign({ _id: req.user._id }, process.env.AUTH_SECRET)
//     res.redirect(`${process.env.CLIENT_DOMAIN}/auth/callback?token=${token}`)
//   }
// )

// /* NAVER */
// authRouter.get('/naver', passportNaver.authenticate('naver'))

// authRouter.get(
//   '/naver/callback',
//   passportNaver.authenticate('naver', {
//     failureRedirect: '/naver-failure-redirect',
//     session: false,
//   }),
//   (req, res) => {
//     // @ts-ignore
//     const token = jwt.sign({ _id: req.user._id }, process.env.AUTH_SECRET)
//     res.redirect(`${process.env.CLIENT_DOMAIN}/auth/callback?token=${token}`)
//   }
// )

// /* FACEBOOK */
// authRouter.get('/facebook', passportFacebook.authenticate('facebook'))

// authRouter.get(
//   '/facebook/callback',
//   passportFacebook.authenticate('facebook', {
//     failureRedirect: '/facebook-failure-redirect',
//     session: false,
//   }),
//   (req, res) => {
//     // @ts-ignore
//     const token = jwt.sign({ _id: req.user._id }, process.env.AUTH_SECRET)
//     res.redirect(`${process.env.CLIENT_DOMAIN}/auth/callback?token=${token}`)
//   }
// )

export default authRouter
