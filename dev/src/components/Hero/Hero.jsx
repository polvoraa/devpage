import Aurora from '../Aurora/Aurora';
import SplitText from '../SplitText/SplitText';

import './Hero.css';

const Hero = () => {
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="hero-container">
      {/* 1. Background Aurora */}
      <div className="aurora-wrapper">
        <Aurora
          colorStops={["#F3F4F6", "#5A0F2E", "#6D28D9"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* 2. Conteúdo centralizado */}
      <div className="hero-content">
        <SplitText
          text="Design que ganha vida"
          className="hero-title"
          delay={50}
          animationFrom={{ opacity: 0, y: 40 }}
          animationTo={{ opacity: 1, y: 0 }}
          easing="power4.out"
          threshold={0.2}
          textAlign="center"
        />

        <p className="hero-subtitle">
          Criando interfaces imersivas com React e WebGL.
        </p>
      </div>

      {/* 3. Seta scroll */}
      <button className="hero-scroll-arrow" onClick={handleScrollDown} aria-label="Rolar para baixo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
};

export default Hero;