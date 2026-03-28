const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message || 'Erro ao processar a requisicao.'
    throw new Error(message)
  }

  return data
}

export { API_BASE_URL }
