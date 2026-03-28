import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const authRoutes = Router()

authRoutes.post('/login', async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ message: 'Email e senha sao obrigatorios.' })
  }

  const user = await User.findOne({ email: String(email).toLowerCase() })

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
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )

  return response.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  })
})

authRoutes.get('/me', authMiddleware, async (request, response) => {
  const user = await User.findById(request.user.sub).select('email createdAt')

  if (!user) {
    return response.status(404).json({ message: 'Usuario nao encontrado.' })
  }

  return response.json({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  })
})

export { authRoutes }
