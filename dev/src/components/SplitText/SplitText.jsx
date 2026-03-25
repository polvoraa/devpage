// SplitText.jsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 30,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'p',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      return span;
    });

    el.innerHTML = '';
    chars.forEach((span) => el.appendChild(span));

    gsap.set(chars, { ...from });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      toggleActions: 'play none none reset',
      onEnter: () => {
        gsap.fromTo(chars, { ...from }, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
        });
      },
      onLeaveBack: () => {
        gsap.set(chars, { ...from });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text]);

  const Tag = tag;
  return <Tag ref={ref} className={`split-parent ${className}`} />;
};

export default SplitText;