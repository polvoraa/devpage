import { useEffect, useRef } from "react";
import "./About.css";
import SoftAurora from "../SoftAurora/SoftAurora";

const developer = {
  name: "Matheus Pólvora",
  role: "Full Stack Dev",
  passion: "Clean Code",
  coffee: Infinity,
};

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.18}s`;
              el.classList.add("revealed");
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      {/* ── Aurora background ── */}
      <div className="about-aurora">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#a903be"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      <div className="about-inner">

        {/* ── LEFT: bio ── */}
        <div className="about-left">
          <h2 className="about-heading reveal">
            Sobre 
            <span className="about-heading--accent"> mim.</span>
          </h2>

          <p className="about-body reveal">
            Sou desenvolvedor Full Stack apaixonado por transformar ideias complexas
            em interfaces elegantes e sistemas robustos. Acredito que bom código não
            é apenas funcional — é legível, sustentável e, acima de tudo, feito com
            intenção.
          </p>

          <p className="about-body reveal">
          </p>

          <div className="about-tags reveal">
            {["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"].map((t) => (
              <span key={t} className="about-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: dev card ── */}
        <div className="about-right reveal">
          <div className="dev-card">

            <div className="dev-card__bar">
              <span className="dev-card__dot dev-card__dot--red" />
              <span className="dev-card__dot dev-card__dot--yellow" />
              <span className="dev-card__dot dev-card__dot--green" />
              <span className="dev-card__filename">developer.js</span>
            </div>

            <pre className="dev-card__code">
              <code>
                <span className="tok-keyword">const </span>
                <span className="tok-var">developer</span>
                <span className="tok-punct"> = </span>
                <span className="tok-brace">{"{"}</span>
                {"\n"}
                {Object.entries(developer).map(([key, value]) => (
                  <span key={key} className="tok-line">
                    {"  "}
                    <span className="tok-prop">{key}</span>
                    <span className="tok-punct">: </span>
                    {key === "coffee" ? (
                      <span className="tok-global">Infinity</span>
                    ) : (
                      <span className="tok-string">"{value}"</span>
                    )}
                    <span className="tok-punct">,</span>
                    {"\n"}
                  </span>
                ))}
                <span className="tok-brace">{"}"}</span>
                <span className="tok-punct">;</span>
              </code>
            </pre>

            <span className="dev-card__cursor" />

            <div className="dev-card__footer">
              <span className="dev-card__status" />
              <span className="dev-card__status-text">ready to build</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}