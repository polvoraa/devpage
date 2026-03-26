import Aurora from '../Aurora/Aurora';
import SplitText from '../SplitText/SplitText';
import './Hero.css';

const Hero = () => {
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="hero-container">

      {/* Aurora background */}
      <div className="aurora-wrapper">
        <Aurora
          colorStops={["#F3F4F6", "#5A0F2E", "#6D28D9"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Grain overlay for texture */}
      <div className="hero-grain" />

      {/* Content */}
      <div className="hero-content">

        {/* Eyebrow tag */}
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Full Stack Developer
        </div>

        {/* Main title */}
        <SplitText
          text="Matheus Pólvora"
          className="hero-title"
          delay={50}
          animationFrom={{ opacity: 0, y: 40 }}
          animationTo={{ opacity: 1, y: 0 }}
          easing="power4.out"
          threshold={0.2}
          textAlign="center"
        />

        {/* Subtitle */}
        <p className="hero-subtitle">
          Criando interfaces imersivas com React e WebGL.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas">
          <a href="#portfolio" className="hero-btn hero-btn--primary">
            <span>Ver Portfólio</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contato" className="hero-btn hero-btn--ghost">
            <span>Entrar em contato</span>
          </a>
        </div>

      </div>

      {/* Scroll arrow */}
      <button className="hero-scroll-arrow" onClick={handleScrollDown} aria-label="Rolar para baixo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </section>
  );
};

export default Hero;