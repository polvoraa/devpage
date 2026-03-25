import { useEffect } from 'react';

/**
 * useSmoothScroll
 * Aplica scroll fluido nativo no HTML via CSS scroll-behavior: smooth,
 * e usa lerp para interceptar a roda do mouse dando uma sensação
 * mais suave e cinética ao scroll da página inteira.
 */
export default function useSmoothScroll({ lerp = 0.09 } = {}) {
  useEffect(() => {
    // CSS fallback — navegadores modernos já suportam
    document.documentElement.style.scrollBehavior = 'smooth';

    let currentY = window.scrollY;
    let targetY  = window.scrollY;
    let rafId    = null;
    let isScrolling = false;

    const onWheel = (e) => {
      e.preventDefault();
      targetY = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          targetY + e.deltaY * 1.2
        )
      );
      if (!isScrolling) {
        isScrolling = true;
        tick();
      }
    };

    const tick = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isScrolling = false;
        return;
      }
      currentY += diff * lerp;
      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      if (rafId) cancelAnimationFrame(rafId);
      document.documentElement.style.scrollBehavior = '';
    };
  }, [lerp]);
}