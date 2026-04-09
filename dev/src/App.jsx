import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import StackShowcase from './components/StackShowcase/StackShowcase'
import TechRail from './components/TechRail/TechRail'
import Portfolio from './components/Portfolio/Portfolio'
import ContactPage from './pages/ContactPage/ContactPage'
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage'
import AdminMessagesPage from './pages/AdminMessagesPage/AdminMessagesPage'
import CreativePortfolioPage from './pages/CreativePortfolioPage/CreativePortfolioPage'
import './App.css'

function ScrollToTopAndHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)

      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }

      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <StackShowcase />
      <Portfolio />
      <TechRail />
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className='app-wrapper'>
      <ScrollToTopAndHash />
      <Header />
      <main className='app-main'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/portfolio-visual' element={<CreativePortfolioPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin/messages' element={<AdminMessagesPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
