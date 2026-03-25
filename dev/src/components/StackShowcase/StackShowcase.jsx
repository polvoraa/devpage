import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack';
import BorderGlow from '../BorderGlow/BorderGlow';
import './StackShowcase.css';

const cards = [
  {
    eyebrow: 'Discovery',
    title: 'Mapeio o problema antes de abrir o editor.',
    text: 'Entendimento de contexto, leitura de código e recorte técnico claro. O objetivo é evitar correção cosmética e atacar a causa real.'
  },
  {
    eyebrow: 'Design + Code',
    title: 'Interface forte sem sacrificar performance.',
    text: 'Motion, contraste, hierarquia e componentes pensados para produção. A experiência precisa parecer intencional em desktop e mobile.'
  },
  {
    eyebrow: 'Entrega',
    title: 'Implementação com validação no final.',
    text: 'Mudança aplicada, build rodado e comportamento revisado. Menos opinião solta, mais resultado verificável.'
  }
];

export default function StackShowcase() {
  return (
      <ScrollStack className="stack-showcase">
      {cards.map((card) => (
        <ScrollStackItem key={card.title} className="stack-showcase-card">
          <BorderGlow
            className="stack-showcase-glow"
            glowColor="278 78 82"
            backgroundColor="rgba(10, 10, 12, 0.94)"
            borderRadius={32}
            glowRadius={44}
            glowIntensity={1}
            coneSpread={24}
            fillOpacity={0.42}
            colors={['#c084fc', '#f472b6', '#f3f4f6']}
          >
            <div className="stack-showcase-shell">
              <div className="stack-showcase-copy">
                <span className="stack-showcase-eyebrow">{card.eyebrow}</span>
                <h2 className="stack-showcase-title">{card.title}</h2>
                <p className="stack-showcase-text">{card.text}</p>
              </div>

              <div className="stack-showcase-panel" aria-hidden="true">
                <div className="stack-showcase-orb" />
                <div className="stack-showcase-grid" />
              </div>
            </div>
          </BorderGlow>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
