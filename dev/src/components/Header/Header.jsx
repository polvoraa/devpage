import { useState } from 'react'
import PillNav from '../PillNav/PillNav';
import logo from '../../assets/logoWhite.svg';
import GlassSurface from '../GlassSurface/GlassSurface'
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' }
        ]}
        activeHref="/"
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
