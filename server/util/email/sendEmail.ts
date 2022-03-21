import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'cornellwebdev@gmail.com',
    pass: process.env.EMAIL_PWD,
  },
})

export interface IEmailConfig {
  to: string
  subject: string
  html: string
}

const sendEmail = ({ to, subject, html }: IEmailConfig) => {
  console.log('sendEmail request received', to, subject, html)

  const mailOptions = {
    from: 'cornellwebdev@gmail.com',
    to,
    subject,
    html,
  }

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log('ERROR sendEmail', error)
    } else {
      console.log('SUCCESS sendEmail', info)
    }
  })
}

export default sendEmail
