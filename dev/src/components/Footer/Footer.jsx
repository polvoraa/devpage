import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-copy">
          <span className="footer-kicker">Vamos conversar</span>
          <h2 className="footer-title">Tem um projeto, produto ou ideia para tirar do papel?</h2>
          <p className="footer-text">
            Se fizer sentido para o seu momento, me manda uma mensagem e eu retorno com os
            próximos passos.
          </p>
        </div>

        <div className="footer-actions">
          <Link to="/contact" className="footer-button">
            Ir para contato
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
