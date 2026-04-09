import Footer from '../../components/Footer/Footer'
import './CreativePortfolioPage.css'

const featuredWorks = [
  {
    title: 'Branding para marca autoral',
    category: 'Branding',
    size: 'tall',
    accent: 'gold',
    summary:
      'Direcao criativa, tom visual e sistema base para uma marca com presenca editorial e assinatura propria.',
    details: ['Posicionamento visual', 'Moodboard', 'Aplicacoes principais'],
  },
  {
    title: 'Identidade visual para lancamento',
    category: 'Identidade visual',
    size: 'medium',
    accent: 'orange',
    summary:
      'Construcao de linguagem visual para campanha, com consistencia entre digital, impresso e motion.',
    details: ['Paleta e tipografia', 'Key visuals', 'Assets de campanha'],
  },
  {
    title: 'Edicao de video para reels e anuncios',
    category: 'Video',
    size: 'wide',
    accent: 'blue',
    summary:
      'Cortes, ritmo, legendas e narrativa pensados para captar atencao nos primeiros segundos.',
    details: ['Edicao vertical', 'Ritmo de retencao', 'Versoes por canal'],
  },
  {
    title: 'Tratamento e edicao de imagem',
    category: 'Imagem',
    size: 'small',
    accent: 'pink',
    summary:
      'Refino de contraste, cor, textura e enquadramento para fortalecer percepcao de valor da marca.',
    details: ['Color grading', 'Retoque', 'Adaptacao para formatos'],
  },
  {
    title: 'Captacao de foto e video',
    category: 'Captacao',
    size: 'tall',
    accent: 'green',
    summary:
      'Planejamento de cena, direcao e captura para gerar material bruto consistente e facil de desdobrar.',
    details: ['Briefing de cena', 'Direcao no set', 'Capitulos de conteudo'],
  },
  {
    title: 'Sistema visual para social media',
    category: 'Conteudo visual',
    size: 'medium',
    accent: 'violet',
    summary:
      'Templates, composicao e repertorio visual para manter a marca reconhecivel em publicacoes recorrentes.',
    details: ['Grid de posts', 'Capas e thumbs', 'Biblioteca de elementos'],
  },
]

const serviceBlocks = [
  {
    title: 'Branding e identidade',
    text: 'Marcas que precisam parecer coerentes antes mesmo de explicar o que fazem.',
  },
  {
    title: 'Video e motion',
    text: 'Pecas pensadas para ritmo, clareza de mensagem e melhor desempenho em feed, story e anuncio.',
  },
  {
    title: 'Imagem e captacao',
    text: 'Material criado na origem para sustentar campanha, lancamento, portfolio e presenca digital.',
  },
]

function CreativePortfolioPage() {
  return (
    <>
      <section className="creative-portfolio-page">
        <div className="creative-portfolio-shell">
          <div className="creative-portfolio-hero">
            <span className="creative-portfolio-kicker">Portfolio visual</span>
            <h1 className="creative-portfolio-title">
              Branding, identidade visual, video, imagem e captacao em uma pagina propria.
            </h1>
            <p className="creative-portfolio-intro">
              Esta pagina funciona como uma vitrine dedicada para trabalhos visuais. A estrutura
              separa claramente os tipos de entrega e usa masonry grid para deixar o portfolio
              mais editorial, dinamico e facil de expandir com novos cases.
            </p>
          </div>

          <div className="creative-service-strip">
            {serviceBlocks.map((block) => (
              <article key={block.title} className="creative-service-card">
                <span className="creative-service-label">{block.title}</span>
                <p>{block.text}</p>
              </article>
            ))}
          </div>

          <div className="creative-masonry" aria-label="Portfolio visual em masonry grid">
            {featuredWorks.map((work, index) => (
              <article
                key={work.title}
                className={`creative-work-card creative-work-card--${work.size} creative-work-card--${work.accent}`}
              >
                <div className="creative-work-overlay" aria-hidden="true" />
                <div className="creative-work-header">
                  <span className="creative-work-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="creative-work-category">{work.category}</span>
                </div>

                <div className="creative-work-body">
                  <h2>{work.title}</h2>
                  <p>{work.summary}</p>
                </div>

                <ul className="creative-work-details">
                  {work.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="creative-portfolio-cta">
            <span className="creative-portfolio-cta-label">Formato da pagina</span>
            <p>
              Se quiser, o proximo passo e substituir estes cards por trabalhos reais com imagens,
              thumbs de video, links externos e filtros por categoria.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CreativePortfolioPage
