import Aurora from '../Aurora/Aurora';
import SplitText from '../SplitText/SplitText';
import GlassSurface from '../GlassSurface/GlassSurface'

import './Hero.css'  // O componente que você postou

const Hero = () => {
  return (
    <section className="hero-container">
      {/* 1. Background Aurora ocupa tudo ao fundo */}
      <div className="aurora-wrapper">
        <Aurora
          colorStops={["#F3F4F6", "#5A0F2E", "#6D28D9"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* 2. Conteúdo centralizado e acima da Aurora */}
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
    </section>
    
  );
};

export default Hero;
