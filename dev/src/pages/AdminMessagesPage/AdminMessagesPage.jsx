import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../lib/api'
import './AdminMessagesPage.css'

function AdminMessagesPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMessages() {
      try {
        setError('')
        const data = await apiRequest('/contacts')
        setMessages(data)
      } catch (requestError) {
        if (requestError.status === 401) {
          navigate('/admin/login', { replace: true })
          return
        }

        setError(requestError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' })
    } finally {
      navigate('/admin/login', { replace: true })
    }
  }

  return (
    <section className="admin-messages-page">
      <div className="admin-messages-shell">
        <div className="admin-messages-topbar">
          <h1>Mensagens do formulario</h1>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>

        {isLoading ? <p>Carregando mensagens...</p> : null}
        {error ? <p className="admin-messages-error">{error}</p> : null}

        {!isLoading && !error && messages.length === 0 ? (
          <p>Nenhuma mensagem cadastrada ainda.</p>
        ) : null}

        <div className="admin-messages-list">
          {messages.map((item) => (
            <article key={item.id} className="admin-message-card">
              <header>
                <h2>{item.name}</h2>
                <time>
                  {new Date(item.createdAt).toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </time>
              </header>

              <p>
                <strong>E-mail:</strong> {item.email}
              </p>
              <p>
                <strong>Empresa:</strong> {item.company || '-'}
              </p>
              <p className="admin-message-content">{item.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminMessagesPage
