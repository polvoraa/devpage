import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { connectDatabase } from './config/db.js'
import { User } from './models/User.js'
import { securityHeadersMiddleware } from './middlewares/securityHeadersMiddleware.js'
import { authRoutes } from './routes/authRoutes.js'
import { contactRoutes } from './routes/contactRoutes.js'

const app = express()

app.disable('x-powered-by')
app.use(securityHeadersMiddleware)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  }),
)
app.use(express.json({ limit: '16kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.warn('ADMIN_EMAIL ou ADMIN_PASSWORD nao definidos. Login admin desativado.')
    return
  }

  const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() })

  if (existingAdmin) {
    return
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10)

  await User.create({
    email: adminEmail.toLowerCase(),
    passwordHash,
  })

  console.log(`Admin inicial criado: ${adminEmail}`)
}

async function startServer() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET nao configurado no .env')
    }

    await connectDatabase()
    await ensureAdminUser()

    const port = Number(process.env.PORT) || 5000
    app.listen(port, () => {
      console.log(`Backend rodando em http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar backend:', error)
    process.exit(1)
  }
}

app.use((error, _request, response, _next) => {
  console.error('Erro nao tratado:', error)
  return response.status(500).json({ message: 'Erro interno do servidor.' })
})

startServer()
