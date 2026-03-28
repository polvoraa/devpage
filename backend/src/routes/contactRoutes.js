import { Router } from 'express'
import { Contact } from '../models/Contact.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const contactRoutes = Router()

contactRoutes.post('/', async (request, response) => {
  const { name, email, company = '', message } = request.body

  if (!name || !email || !message) {
    return response
      .status(400)
      .json({ message: 'Nome, email e mensagem sao obrigatorios.' })
  }

  const createdContact = await Contact.create({
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    company: String(company).trim(),
    message: String(message).trim(),
  })

  return response.status(201).json({
    id: createdContact.id,
    message: 'Mensagem enviada com sucesso.',
  })
})

contactRoutes.get('/', authMiddleware, async (_request, response) => {
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
})

export { contactRoutes }
