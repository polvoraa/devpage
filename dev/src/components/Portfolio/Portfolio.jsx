import { memo, useCallback, useRef } from 'react';
import './Portfolio.css';
import plannerPreview from '../../assets/images/portifolio/plannerpreview.png';
import novaPreview from '../../assets/images/portifolio/novapreview.png';
import consultoriaPreview from '../../assets/images/portifolio/consultoriapreview.png';

const projects = [
  {
    title: 'Planner Pessoal',
    category: 'Full Stack',
    description: `Planner inteligente com dashboard, tarefas diarias e integracao com formularios dos meus sites.
Organizacao e dados centralizados pra facilitar a rotina e tomada de decisao.`,
    stack: ['Vite', 'React', 'CSS', 'Node.js', 'Express', 'Mongoose', 'MongoDb'],
    liveUrl: 'https://planner-beta-liart.vercel.app/#',
    repoUrl: 'https://github.com/polvoraa/planner',
    image: plannerPreview,
  },
  {
    title: 'Site para empresa de Consultoria',
    category: 'Full Stack',
    description: `Site institucional com home, projetos e servicos para empresa de consultoria em construcao civil.
Dashboard com login para acesso e gestao das respostas dos formularios.`,
    stack: ['Vite', 'React', 'CSS', 'Node.js', 'Express', 'Mongoose', 'MongoDb'],
    liveUrl: 'https://www.polvora-consultoria.com',
    repoUrl: 'https://github.com/polvoraa/polvora-consultoria',
    image: consultoriaPreview,
  },
  {
    title: 'Site para Estudio de Audio Visual',
    category: 'Full Stack',
    description: `Site institucional com home e vitrine de projetos para estudio audiovisual e marketing.
Dashboard com login para adicionar e remover projetos de forma dinamica.`,
    stack: ['Vite', 'React', 'CSS', 'Node.js', 'Express', 'Mongoose', 'MongoDb'],
    liveUrl: 'https://nova-six-sage.vercel.app/#/',
    repoUrl: 'https://github.com/polvoraa/nova',
    image: novaPreview,
  },
];

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const updateOffset = useCallback(() => {
    if (!imgRef.current || !containerRef.current) return;

    const imgHeight = imgRef.current.offsetHeight;
    const containerHeight = containerRef.current.offsetHeight;
    const maxOffset = Math.max(0, imgHeight - containerHeight);
    imgRef.current.style.setProperty('--portfolio-offset', `${maxOffset}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    updateOffset();
    imgRef.current?.classList.add('is-hovered');
  }, [updateOffset]);

  const handleMouseLeave = useCallback(() => {
    imgRef.current?.classList.remove('is-hovered');
  }, []);

  return (
    <article
      className="portfolio-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="portfolio-card-top">
        <span className="portfolio-index">0{index + 1}</span>
        <span className="portfolio-category">{project.category}</span>
      </div>

      <div className="portfolio-visual" ref={containerRef} aria-hidden="true">
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          className="portfolio-image"
          loading="lazy"
          decoding="async"
          onLoad={updateOffset}
        />
        <div className="portfolio-visual-glow" />
      </div>

      <div className="portfolio-card-body">
        <h3 className="portfolio-card-title">{project.title}</h3>
        <p className="portfolio-card-text">{project.description}</p>

        <div className="portfolio-tags">
          {project.stack.map((item) => (
            <span className="portfolio-tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="portfolio-links">
        <a href={project.liveUrl} className="portfolio-link" target="_blank" rel="noreferrer">
          Ver projeto
        </a>
        <a
          href={project.repoUrl}
          className="portfolio-link portfolio-link--ghost"
          target="_blank"
          rel="noreferrer"
        >
          Codigo
        </a>
      </div>
    </article>
  );
});

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-shell">
        <div className="portfolio-heading">
          <span className="portfolio-kicker">Portfolio</span>
          <h2 className="portfolio-title">Projetos que mostram como eu penso e construo.</h2>
          <p className="portfolio-intro">
            Cada card abaixo pode ser trocado pelos seus projetos reais. A estrutura ja
            deixa titulo, descricao, stack e links prontos.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
