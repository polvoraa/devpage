import { Router } from 'express'
import { Contact } from '../models/Contact.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createRateLimit } from '../middlewares/rateLimitMiddleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { isValidEmail, normalizeEmail, normalizeString } from '../utils/validation.js'

const contactRoutes = Router()
const contactCreateRateLimit = createRateLimit({
  keyPrefix: 'contact-create',
  limit: 5,
  windowMs: 10 * 60 * 1000,
  message: 'Muitas mensagens enviadas. Tente novamente em alguns minutos.',
})

contactRoutes.post('/', contactCreateRateLimit, asyncHandler(async (request, response) => {
  const name = normalizeString(request.body?.name)
  const email = normalizeEmail(request.body?.email)
  const company = normalizeString(request.body?.company)
  const message = normalizeString(request.body?.message)

  if (!name || !email || !message) {
    return response
      .status(400)
      .json({ message: 'Nome, email e mensagem sao obrigatorios.' })
  }

  if (
    !isValidEmail(email) ||
    name.length < 2 ||
    name.length > 120 ||
    company.length > 120 ||
    message.length < 10 ||
    message.length > 2000
  ) {
    return response.status(400).json({ message: 'Dados de contato invalidos.' })
  }

  const createdContact = await Contact.create({
    name,
    email,
    company,
    message,
  })

  return response.status(201).json({
    id: createdContact.id,
    message: 'Mensagem enviada com sucesso.',
  })
}))

contactRoutes.get('/', authMiddleware, asyncHandler(async (_request, response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })

  return response.json(
    contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      company: contact.company,
      message: contact.message,
      createdAt: contact.createdAt,
    })),
  )
}))

export { contactRoutes }
