function encodeCookieValue(value) {
  return encodeURIComponent(String(value))
}

export function parseCookies(cookieHeader) {
  if (!cookieHeader) {
    return {}
  }

  return cookieHeader.split(';').reduce((cookies, part) => {
    const separatorIndex = part.indexOf('=')

    if (separatorIndex === -1) {
      return cookies
    }

    const key = part.slice(0, separatorIndex).trim()
    const value = part.slice(separatorIndex + 1).trim()

    if (!key) {
      return cookies
    }

    cookies[key] = decodeURIComponent(value)
    return cookies
  }, {})
}

export function createAuthCookie(token) {
  const isProduction = process.env.NODE_ENV === 'production'
  const sameSite = isProduction ? 'None' : 'Lax'
  const parts = [
    `admin_token=${encodeCookieValue(token)}`,
    'HttpOnly',
    'Path=/',
    `SameSite=${sameSite}`,
    `Max-Age=${7 * 24 * 60 * 60}`,
  ]

  if (isProduction) {
    parts.push('Secure')
  }

  return parts.join('; ')
}

export function createExpiredAuthCookie() {
  const isProduction = process.env.NODE_ENV === 'production'
  const sameSite = isProduction ? 'None' : 'Lax'
  const parts = [
    'admin_token=',
    'HttpOnly',
    'Path=/',
    `SameSite=${sameSite}`,
    'Max-Age=0',
  ]

  if (isProduction) {
    parts.push('Secure')
  }

  return parts.join('; ')
}
