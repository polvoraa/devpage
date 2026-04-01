import jwt from 'jsonwebtoken'

export function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Token ausente.' })
  }

  const token = authHeader.split(' ')[1]

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
