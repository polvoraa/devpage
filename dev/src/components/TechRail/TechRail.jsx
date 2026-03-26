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
    name: 'JavaScript',
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
  const sectionRef  = useRef(null);
  const viewportRef = useRef(null);
  const trackRef    = useRef(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const viewport = viewportRef.current;
    const track    = trackRef.current;
    if (!section || !viewport || !track) return;

    // ← aumente este valor se o último card não aparece completo
    const EXTRA_PX = 100;

    const setup = () => {
      const trackW      = track.scrollWidth;
      const viewportW   = viewport.clientWidth;
      const totalScroll = Math.max(trackW - viewportW, 0) + EXTRA_PX;
      section.style.minHeight = `${window.innerHeight + totalScroll}px`;
    };

    const onScroll = () => {
      const trackW      = track.scrollWidth;
      const viewportW   = viewport.clientWidth;
      const totalScroll = Math.max(trackW - viewportW, 0) + EXTRA_PX;
      if (totalScroll === 0) return;

      // sectionTop = absolute Y of section start
      const sectionTop  = section.getBoundingClientRect().top + window.scrollY;
      // scroll starts when section top hits viewport top
      const raw         = window.scrollY - sectionTop;
      const progress    = Math.min(Math.max(raw / totalScroll, 0), 1);
      track.style.transform = `translate3d(${-totalScroll * progress}px, 0, 0)`;
    };

    let rafId = null;
    const tick = () => {
      onScroll();
      rafId = null;
    };
    const requestTick = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    setup();
    requestTick();

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', () => { setup(); requestTick(); });

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="tech-rail-section" ref={sectionRef}>

      {/* Sticky frame — header + cards pregados juntos na tela */}
      <div className="tech-rail-sticky">

        {/* Header visível junto com os cards */}
        <div className="tech-rail-head">
          <span className="tech-rail-kicker">Stack</span>
          <h2 className="tech-rail-title">Tecnologias que uso para tirar a ideia da tela.</h2>
          <p className="tech-rail-copy">
            Frontend, backend, dados e motion. A proposta aqui nao e colecionar ferramenta, e escolher a
            combinacao certa para cada entrega.
          </p>
        </div>
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

        {/* Progress indicator */}
        <ProgressDots total={techCards.length} trackRef={trackRef} viewportRef={viewportRef} sectionRef={sectionRef} />
      </div>

    </section>
  );
}

/* ── Dot progress indicator ─────────────────────────────── */
function ProgressDots({ total, trackRef, viewportRef, sectionRef }) {
  const dotsRef = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const section  = sectionRef.current;
      const track    = trackRef.current;
      const viewport = viewportRef.current;
      if (!section || !track || !viewport) return;

      const totalScroll = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      const sectionTop  = section.getBoundingClientRect().top + window.scrollY;
      const raw         = window.scrollY - sectionTop;
      const progress    = Math.min(Math.max(raw / totalScroll, 0), 1);
      const activeIndex = Math.round(progress * (total - 1));

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        dot.classList.toggle('active', i === activeIndex);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [total, trackRef, viewportRef, sectionRef]);

  return (
    <div className="tech-rail-dots">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="tech-rail-dot"
          ref={(el) => (dotsRef.current[i] = el)}
        />
      ))}
    </div>
  );
}