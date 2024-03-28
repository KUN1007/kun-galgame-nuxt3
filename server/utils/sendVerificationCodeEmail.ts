import { createTransport } from 'nodemailer'
import SMPTransport from 'nodemailer-smtp-transport'
import env from '~/server/env/dotenv'
import type { H3Event } from 'h3'

const getMailContent = (
  type: 'register' | 'forgot' | 'reset',
  code: string
) => {
  if (type === 'register') {
    return `Your verification code is\n${code}\nYou are registering KUN Visual Novel. Please do not disclose this verification code.`
  } else if (type === 'forgot') {
    return `Your verification code is\n${code}\nYou are resetting your password. Please do not disclose this verification code.`
  } else {
    return `Your verification code is\n${code}\nYou are resetting your email. Please do not disclose this verification code.`
  }
}

export const sendVerificationCodeEmail = async (
  event: H3Event,
  email: string,
  type: 'register' | 'forgot' | 'reset'
) => {
  const ip = getRemoteIp(event)

  const limitEmail = await useStorage('redis').getItem(`limit:email:${email}`)
  const limitIP = await useStorage('redis').getItem(`limit:ip:${ip}`)
  if (limitEmail || limitIP) {
    return 10301
  }

  const code = generateRandomCode(7)
  await useStorage('redis').setItem(email, code, { ttl: 10 * 60 })
  await useStorage('redis').setItem(`limit:email:${email}`, code, { ttl: 30 })
  await useStorage('redis').setItem(`limit:ip:${ip}`, code, { ttl: 30 })

  const transporter = createTransport(
    SMPTransport({
      pool: {
        pool: true
      },
      host: env.KUN_VISUAL_NOVEL_EMAIL_HOST,
      port: Number(env.KUN_VISUAL_NOVEL_EMAIL_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT,
        pass: env.KUN_VISUAL_NOVEL_EMAIL_PASSWORD
      }
    })
  )

  const mailOptions = {
    from: `${env.KUN_VISUAL_NOVEL_EMAIL_FROM}<${env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT}>`,
    sender: env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT,
    to: email,
    subject: 'KUN Visual Novel Verification Code',
    text: getMailContent(type, code)
  }

  transporter.sendMail(mailOptions)
}
