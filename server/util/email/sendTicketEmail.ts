import sendEmail from './sendEmail'

export interface ISendTicketEmailConfigs {
  email: string
  eventName: string
}

const sendTicketEmail = ({ email, eventName }: ISendTicketEmailConfigs) => {
  console.log('sendTicketEmail request received', email, eventName)
  const subject = `[RSVP] Here's your ticket for ${eventName}!`
  const isDev = process.env.NODE_ENV === 'development'
  const devHtml = `<div>Intended recipent: ${email}</div>`

  const html = `
    <div>
      ${isDev ? devHtml : '<div></div>'}
      <div style="font-weight:bold;">
       Access your ticket in RSVP:
       </div>
      <div>
       https://cornellrsvp.com/profile/my-tickets
      </div>
      <br />
      <div style="color:white;">
        Tag: ${Math.random()}
      </div>
    </div>
  `
  const to = isDev ? 'jj534@cornell.edu' : email

  sendEmail({ to, subject, html })
}

export default sendTicketEmail
