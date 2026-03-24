import Aurora from '../Aurora/Aurora';
import SplitText from "../SplitText/SplitText";

const Hero = () => {
    return (
        <section style={styles.heroContainer}>
            {/* Background Aurora */}
            <div style={styles.auroraWrapper}>
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#4332FF"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            {/* Conteúdo da Hero */}
            <div style={styles.content}>
                <SplitText
                    text="Hello, you!"
                    className="text-2xl font-semibold text-center"
                    delay={50}
                    duration={1.25}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                    showCallback
                />
                <p style={styles.subtitle}>
                    Experiências digitais imersivas com React e WebGL.
                </p>
                <button style={styles.button}>Começar Agora</button>
            </div>
        </section>
    );
};

const styles = {
    heroContainer: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#000', // Fundo preto ajuda o brilho da Aurora
        color: '#fff',
        textAlign: 'center',
    },
    auroraWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2, // Garante que o texto fique acima da Aurora
        padding: '0 20px',
    },
    title: {
        fontSize: '4rem',
        marginBottom: '1rem',
        fontWeight: '800',
    },
    subtitle: {
        fontSize: '1.5rem',
        opacity: 0.8,
        marginBottom: '2rem',
    },
    button: {
        padding: '12px 24px',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
    }
};

export default Hero;
