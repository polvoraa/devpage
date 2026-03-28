import { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import './ContactPage.css'

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: '',
}

function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData((current) => ({ ...current, [name]: value }))
    setIsSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <>
      <section className="contact-page">
        <div className="contact-page-shell">
          <div className="contact-page-copy">
            <span className="contact-page-kicker">Contato</span>
            <h1 className="contact-page-title">Vamos falar sobre o seu próximo projeto.</h1>
            <p className="contact-page-text">
              Preencha o formulário com o contexto principal da demanda. Assim eu consigo
              responder com mais precisão e sem ida e volta desnecessária.
            </p>

            <div className="contact-page-highlights">
              <div className="contact-highlight">
                <span className="contact-highlight-label">Tipo de projeto</span>
                <strong>Landing pages, apps e produtos web</strong>
              </div>
              <div className="contact-highlight">
                <span className="contact-highlight-label">Foco</span>
                <strong>Interface forte, código limpo e entrega objetiva</strong>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-field">
              <span>Nome</span>
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="contact-field">
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                placeholder="voce@empresa.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="contact-field">
              <span>Empresa ou projeto</span>
              <input
                type="text"
                name="company"
                placeholder="Nome da empresa ou produto"
                value={formData.company}
                onChange={handleChange}
              />
            </label>

            <label className="contact-field">
              <span>Mensagem</span>
              <textarea
                name="message"
                placeholder="Me conte o objetivo, prazo e o que voce precisa construir."
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="contact-submit">
              Enviar mensagem
            </button>

            {isSubmitted ? (
              <p className="contact-feedback">
                Mensagem pronta. Se quiser, no próximo passo eu posso ligar esse formulário a um
                serviço real de envio.
              </p>
            ) : null}
          </form>
        </div>
      </section>


    </>
  )
}

export default ContactPage
