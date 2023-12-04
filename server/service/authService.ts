/*
 * 鉴权服务，用户 jwt 路由接口鉴权
 */
import bcrypt from 'bcrypt'
import { verifyJWTPayload, generateToken } from '@/utils/jwt'
import { setValue, getValue } from '@/config/redisConfig'
import nodemailer from 'nodemailer'
import SMPTransport from 'nodemailer-smtp-transport'
import { generateRandomCode } from '@/utils/generateRandomCode'
import env from '@/config/config.dev'
import UserModel from '@/models/userModel'

class AuthService {
  // 验证码有效时间
  private EXPIRE_TIME = 10 * 60
  // 验证码限制发送时间
  private LIMIT_TIME = 30

  // 生成 token
  async generateTokens(uid: number, name: string) {
    const token = generateToken(uid, name, '60m')
    const refreshToken = generateToken(uid, name, '7d')

    // 存储 refresh token 到 Redis，key 为用户的 uid, 存储 7 天
    await setValue(`refreshToken:${uid}`, refreshToken, 7 * 24 * 60 * 60)

    return { token, refreshToken }
  }

  // 根据 refresh token 生成 token
  async generateTokenByRefreshToken(refreshToken: string) {
    // 将 refreshToken 解码获取用户的 uid
    const decoded = verifyJWTPayload(refreshToken)

    // 没有获取到直接返回
    if (!decoded) {
      return null
    }

    // 不是由 kungalgame 签发的萌萌 token
    if (
      !decoded.uid ||
      decoded.iss !== 'kungalgame' ||
      decoded.aud !== 'kungalgamer'
    ) {
      return null
    }

    // 新生成的 token
    const accessToken = generateToken(decoded.uid, decoded.name, '60m')

    return accessToken
  }

  // 发送验证码邮件
  async sendVerificationCodeEmail(email: string) {
    try {
      const limitEmail = await getValue(`limit:${email}`)
      // 如果已经设置了发送邮件的定时器，则不再发送邮件
      if (limitEmail) {
        return 10301
      }

      // 生成 7 位随机验证码
      const code = generateRandomCode(7)
      // 存储验证码并设置有效期为10分钟
      await setValue(email, code, this.EXPIRE_TIME)
      // 根据邮件限制单个用户 30s 发送频率
      await setValue(`limit:${email}`, code, this.LIMIT_TIME)

      const transporter = nodemailer.createTransport(
        SMPTransport({
          host: env.KUN_VISUAL_NOVEL_EMAIL_HOST,
          auth: {
            user: env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT,
            pass: env.KUN_VISUAL_NOVEL_EMAIL_PASSWORD,
          },
        })
      )

      const mailOptions = {
        from: `${env.KUN_VISUAL_NOVEL_EMAIL_FROM}<${env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT}>`,
        sender: env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT,
        to: email,
        subject: 'KUN Visual Novel Verification Code',
        text: `Your verification code is\n${code}\nYou are registering KUN Visual Novel. Please do not disclose this verification code.`,
      }

      // 发送邮件
      transporter.sendMail(mailOptions)
    } catch (error) {
      console.log(error)
    }
  }

  // 验证验证码
  async verifyVerificationCode(
    email: string,
    userProvidedCode: string
  ): Promise<boolean> {
    // 从存储中获取验证码
    const storedCode = await getValue(email)

    if (!storedCode) {
      // 没有存储的验证码，或者已过期
      return false
    }

    // 检查用户提供的验证码是否与存储的验证码匹配
    return userProvidedCode === storedCode
  }

  // 发送邮箱重置验证码
  async sendResetEmailCode(email: string) {
    try {
      const limitEmail = await getValue(`limit:${email}`)
      // 如果已经设置了发送邮件的定时器，则不再发送邮件
      if (limitEmail) {
        return 10301
      }

      // 该邮箱已经被绑定
      const user = await UserModel.findOne({ email: email })
      if (user) {
        return 10104
      }

      // 生成 7 位随机验证码
      const code = generateRandomCode(7)
      // 存储验证码并设置有效期为10分钟
      await setValue(email, code, this.EXPIRE_TIME)
      // 根据邮件限制单个用户 30s 发送频率
      await setValue(`limit:${email}`, code, this.LIMIT_TIME)

      const transporter = nodemailer.createTransport(
        SMPTransport({
          host: env.KUN_VISUAL_NOVEL_EMAIL_HOST,
          auth: {
            user: env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT,
            pass: env.KUN_VISUAL_NOVEL_EMAIL_PASSWORD,
          },
        })
      )

      const mailOptions = {
        from: `${env.KUN_VISUAL_NOVEL_EMAIL_FROM}<${env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT}>`,
        sender: env.KUN_VISUAL_NOVEL_EMAIL_ACCOUNT,
        to: email,
        subject: 'KUN Visual Novel Verification Code',
        text: `Your verification code is\n${code}\nYou are resetting your email. Please do not disclose this verification code.`,
      }

      // 发送邮件
      transporter.sendMail(mailOptions)
    } catch (error) {
      console.log(error)
    }
  }

  // 重置密码
  async resetPasswordByEmail(email: string, code: string, newPassword: string) {
    const validEmail = this.verifyVerificationCode(email, code)

    // 邮箱和验证码不匹配
    if (!validEmail) {
      return 10103
    }

    // 对新密码加密
    const hashedPassword = await bcrypt.hash(newPassword, 7)

    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    )

    // 未找到用户
    if (!user) {
      return 10101
    }
  }
}

export default new AuthService()
