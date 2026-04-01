import jwt from 'jsonwebtoken'
import { parseCookies } from '../utils/cookies.js'

export function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization
  const cookies = parseCookies(request.headers.cookie)
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
  const token = cookies.admin_token || bearerToken

  if (!token) {
    return response.status(401).json({ message: 'Token ausente.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    })

    if (!payload || typeof payload !== 'object' || typeof payload.sub !== 'string') {
      return response.status(401).json({ message: 'Token invalido ou expirado.' })
    }

    request.user = payload
    return next()
  } catch {
    return response.status(401).json({ message: 'Token invalido ou expirado.' })
  }
}
