import { useState } from 'react'
import useSmoothScroll from './components/Hooks/useSmoothScroll'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import './App.css'

function App() {
  useSmoothScroll({ lerp: 0.09 });
  return (
    <>
    <Header />
    <Hero />
    <About />
    
    </>
  )
}

export default App
