const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeString(value) {
  return String(value ?? '').trim()
}

export function normalizeEmail(value) {
  return normalizeString(value).toLowerCase()
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(normalizeEmail(value))
}
