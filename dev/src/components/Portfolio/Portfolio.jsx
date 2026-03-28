import { useRef, useState } from 'react';
import './Portfolio.css';
import plannerPreview from '../../assets/images/portifolio/plannerpreview.png';
import novaPreview from '../../assets/images/portifolio/novapreview.png';
import consultoriaPreview from '../../assets/images/portifolio/consultoriapreview.png';

const projects = [
  {
    title: 'Planner Pessoal',
    category: 'Full Stack',
    description: `Planner inteligente com dashboard, tarefas diárias e integração com formulários dos meus sites.
Organização e dados centralizados pra facilitar a rotina e tomada de decisão.`,
    stack: ['Vite', 'React', 'CSS', 'Node.js', 'Express', 'Mongoose', 'MongoDb'],
    liveUrl: 'https://planner-beta-liart.vercel.app/#',
    repoUrl: 'https://github.com/polvoraa/planner',
    image: plannerPreview,
  },
  {
    title: 'Site para empresa de Consultoria',
    category: 'Full Stack',
    description: `Site institucional com home, projetos e serviços para empresa de consultoria em construção civil.
Dashboard com login para acesso e gestão das respostas dos formulários.`,
    stack: ['Vite', 'React', 'CSS', 'Node.js', 'Express', 'Mongoose', 'MongoDb'],
    liveUrl: 'https://www.polvora-consultoria.com',
    repoUrl: 'https://github.com/polvoraa/polvora-consultoria',
    image: consultoriaPreview,
  },
  {
    title: 'Site para Estúdio de Audio Visual',
    category: 'Full Stack',
    description: `Site institucional com home e vitrine de projetos para estúdio audiovisual e marketing.
Dashboard com login para adicionar e remover projetos de forma dinâmica.`,
    stack: ['Vite', 'React', 'CSS', 'Node.js', 'Express', 'Mongoose', 'MongoDb'],
    liveUrl: 'https://nova-six-sage.vercel.app/#/',
    repoUrl: 'https://github.com/polvoraa/nova',
    image: novaPreview,
  },
];

function ProjectCard({ project, index }) {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    if (imgRef.current && containerRef.current) {
      const imgHeight = imgRef.current.offsetHeight;
      const containerHeight = containerRef.current.offsetHeight;
      const maxOffset = Math.max(0, imgHeight - containerHeight);
      setOffset(maxOffset);
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setOffset(0);
  };

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
          style={{
            transform: hovered ? `translateY(-${offset}px)` : 'translateY(0)',
          }}
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
        <a href={project.liveUrl} className="portfolio-link">
          Ver projeto
        </a>
        <a href={project.repoUrl} className="portfolio-link portfolio-link--ghost">
          Código
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-shell">
        <div className="portfolio-heading">
          <span className="portfolio-kicker">Portfolio</span>
          <h2 className="portfolio-title">Projetos que mostram como eu penso e construo.</h2>
          <p className="portfolio-intro">
            Cada card abaixo pode ser trocado pelos seus projetos reais. A estrutura já
            deixa título, descrição, stack e links prontos.
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