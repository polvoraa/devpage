import { useEffect, useRef } from 'react';
import BorderGlow from '../BorderGlow/BorderGlow';
import './TechRail.css';

const techCards = [
  {
    name: 'React',
    label: 'Frontend',
    description: 'Interfaces dinamicas, componentizacao consistente e motion com foco em experiencia.'
  },
  {
    name: 'TypeScript',
    label: 'Arquitetura',
    description: 'Codigo previsivel, contratos claros e manutencao menos fragil conforme o projeto cresce.'
  },
  {
    name: 'Node.js',
    label: 'Backend',
    description: 'APIs, integracoes e automacoes com foco em tempo de resposta e legibilidade.'
  },
  {
    name: 'PostgreSQL',
    label: 'Dados',
    description: 'Modelagem confiavel, consultas robustas e base solida para produtos reais.'
  },
  {
    name: 'Docker',
    label: 'Infra',
    description: 'Ambientes reproduziveis, deploy mais previsivel e menos ruido entre dev e producao.'
  },
  {
    name: 'GSAP / WebGL',
    label: 'Motion',
    description: 'Animacoes fluidas e superficies visuais que dao identidade sem sacrificar performance.'
  }
];

export default function TechRail() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const updateTrack = () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      const firstCard = track.firstElementChild;
      if (!firstCard) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const viewportWidth = viewport.clientWidth;
      const viewportHeight = window.innerHeight;
      const maxOverflow = Math.max(track.scrollWidth - viewportWidth, 0);
      const firstCardWidth = firstCard.getBoundingClientRect().width;
      const maxTranslate = Math.min(maxOverflow, Math.max(firstCardWidth * 0.7, 96));
      const travelDistance = Math.max(maxTranslate + viewportHeight * 0.35, viewportHeight * 0.9);

      section.style.minHeight = `${viewportHeight + travelDistance}px`;

      const start = sectionTop;
      const end = start + travelDistance;
      const progress = end <= start ? 0 : Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);

      track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    };

    let rafId = null;
    const requestUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTrack);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="tech-rail-section" ref={sectionRef}>
      <div className="tech-rail-head">
        <span className="tech-rail-kicker">Stack</span>
        <h2 className="tech-rail-title">Tecnologias que uso para tirar a ideia da tela.</h2>
        <p className="tech-rail-copy">
          Frontend, backend, dados e motion. A proposta aqui nao e colecionar ferramenta, e escolher a
          combinacao certa para cada entrega.
        </p>
      </div>

      <div className="tech-rail-sticky">
        <div className="tech-rail-viewport" ref={viewportRef}>
          <div className="tech-rail-track" ref={trackRef}>
            {techCards.map((card) => (
              <BorderGlow
                key={card.name}
                className="tech-rail-card"
                glowColor="278 78 82"
                backgroundColor="rgba(8, 8, 10, 0.94)"
                borderRadius={30}
                glowRadius={16}
                glowIntensity={0.8}
                coneSpread={22}
                fillOpacity={0.35}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
              >
                <div className="tech-rail-card-inner">
                  <span className="tech-rail-label">{card.label}</span>
                  <h3 className="tech-rail-name">{card.name}</h3>
                  <p className="tech-rail-description">{card.description}</p>
                  <span className="tech-rail-accent" />
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
