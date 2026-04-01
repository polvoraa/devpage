const buckets = new Map()

function getBucketKey(request, keyPrefix) {
  const forwardedFor = request.headers['x-forwarded-for']
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : String(forwardedFor || request.ip || 'unknown').split(',')[0].trim()

  return `${keyPrefix}:${ip}`
}

export function createRateLimit({
  keyPrefix,
  limit,
  windowMs,
  message,
}) {
  return function rateLimitMiddleware(request, response, next) {
    const now = Date.now()
    const bucketKey = getBucketKey(request, keyPrefix)
    const currentBucket = buckets.get(bucketKey)

    if (!currentBucket || currentBucket.expiresAt <= now) {
      buckets.set(bucketKey, {
        count: 1,
        expiresAt: now + windowMs,
      })

      return next()
    }

    if (currentBucket.count >= limit) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((currentBucket.expiresAt - now) / 1000),
      )

      response.setHeader('Retry-After', retryAfterSeconds)
      return response.status(429).json({ message })
    }

    currentBucket.count += 1
    return next()
  }
}
