import { useLocation } from 'react-router-dom';
import PillNav from '../PillNav/PillNav';
import logo from '../../assets/logoWhite.svg';
import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header-container">
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Visual', href: '/portfolio-visual' },
          { label: 'Projetos', href: '/#portfolio' },
          { label: 'Stack', href: '/#stack' },
          { label: 'Contato', href: '/contact' }
        ]}
        activeHref={
          location.pathname === '/contact' || location.pathname === '/portfolio-visual'
            ? location.pathname
            : location.hash
              ? `/${location.hash}`
              : '/'
        }
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
      />
      
    </header>
  )
}

export default Header
