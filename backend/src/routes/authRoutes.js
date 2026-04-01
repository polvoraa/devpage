import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createRateLimit } from '../middlewares/rateLimitMiddleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { isValidEmail, normalizeEmail, normalizeString } from '../utils/validation.js'

const authRoutes = Router()
const loginRateLimit = createRateLimit({
  keyPrefix: 'login',
  limit: 10,
  windowMs: 15 * 60 * 1000,
  message: 'Muitas tentativas de login. Tente novamente em alguns minutos.',
})

authRoutes.post('/login', loginRateLimit, asyncHandler(async (request, response) => {
  const email = normalizeEmail(request.body?.email)
  const password = normalizeString(request.body?.password)

  if (!email || !password || !isValidEmail(email) || password.length > 200) {
    return response.status(400).json({ message: 'Email e senha sao obrigatorios.' })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return response.status(401).json({ message: 'Credenciais invalidas.' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    return response.status(401).json({ message: 'Credenciais invalidas.' })
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
  )

  return response.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  })
}))

authRoutes.get('/me', authMiddleware, asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.sub).select('email createdAt')

  if (!user) {
    return response.status(404).json({ message: 'Usuario nao encontrado.' })
  }

  return response.json({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  })
}))

export { authRoutes }
