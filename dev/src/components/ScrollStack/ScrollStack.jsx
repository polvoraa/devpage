import { Children, cloneElement, forwardRef, isValidElement, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = forwardRef(function ScrollStackItem(
  { children, className = '' },
  ref
) {
  return (
    <article className={`scroll-stack-card ${className}`.trim()} ref={ref}>
      {children}
    </article>
  );
});

function parsePosition(value, viewportHeight) {
  if (typeof value === 'string' && value.includes('%')) {
    return (parseFloat(value) / 100) * viewportHeight;
  }

  return Number(value) || 0;
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.05,
  itemStackDistance = 24,
  stackPosition = '18%',
  scaleEndPosition = '8%',
  baseScale = 0.86,
  rotationAmount = -1.5,
  blurAmount = 0,
  ...restProps
}) {
  const cardsRef = useRef([]);
  const wrappersRef = useRef([]);
  const frameRef = useRef(null);
  const lastTransformsRef = useRef(new Map());

  const childArray = useMemo(() => Children.toArray(children), [children]);
  const wrapperRefCallbacks = Array.from({ length: childArray.length }, (_, index) => (node) => {
    wrappersRef.current[index] = node;
  });
  const cardRefCallbacks = Array.from({ length: childArray.length }, (_, index) => (node) => {
    cardsRef.current[index] = node;
  });

  useLayoutEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, childArray.length);
    wrappersRef.current = wrappersRef.current.slice(0, childArray.length);

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const wrapper = wrappersRef.current[index];
      if (wrapper) {
        wrapper.style.zIndex = `${index + 1}`;
      }

      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });
  }, [childArray.length]);

  useEffect(() => {
    const lastTransforms = lastTransformsRef.current;

    const updateCards = () => {
      const cards = cardsRef.current.filter(Boolean);
      const wrappers = wrappersRef.current.filter(Boolean);
      if (!cards.length || !wrappers.length) return;

      if (window.innerWidth <= 768) {
        cards.forEach((card) => {
          card.style.transform = 'none';
          card.style.filter = 'none';
        });
        lastTransforms.clear();
        return;
      }

      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const stackPositionPx = parsePosition(stackPosition, viewportHeight);
      const scaleEndPositionPx = parsePosition(scaleEndPosition, viewportHeight);

      let frontCardIndex = -1;

      wrappers.forEach((wrapper, index) => {
        const wrapperTop = wrapper.getBoundingClientRect().top + scrollTop;
        const triggerStart = wrapperTop - stackPositionPx;

        if (scrollTop >= triggerStart) {
          frontCardIndex = index;
        }
      });

      cards.forEach((card, index) => {
        const wrapper = wrappersRef.current[index];
        if (!wrapper) return;

        const wrapperTop = wrapper.getBoundingClientRect().top + scrollTop;
        const triggerStart = wrapperTop - stackPositionPx;
        const triggerEnd = wrapperTop - scaleEndPositionPx;
        const denominator = Math.max(triggerEnd - triggerStart, 1);
        const progress = Math.min(Math.max((scrollTop - triggerStart) / denominator, 0), 1);
        const targetScale = baseScale + index * itemScale;
        const scale = 1 - progress * (1 - targetScale);
        const rotation = rotationAmount * index * progress;

        let blur = 0;
        if (blurAmount > 0 && index < frontCardIndex) {
          blur = (frontCardIndex - index) * blurAmount;
        }

        const nextTransform = {
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100
        };

        const prevTransform = lastTransforms.get(index);
        const hasChanged =
          !prevTransform ||
          Math.abs(prevTransform.scale - nextTransform.scale) > 0.001 ||
          Math.abs(prevTransform.rotation - nextTransform.rotation) > 0.1 ||
          Math.abs(prevTransform.blur - nextTransform.blur) > 0.1;

        if (!hasChanged) return;

        card.style.transform = `scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : 'none';
        lastTransforms.set(index, nextTransform);
      });
    };

    const requestUpdate = () => {
      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        updateCards();
      });
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      lastTransforms.clear();
    };
  }, [baseScale, blurAmount, itemScale, rotationAmount, scaleEndPosition, stackPosition]);

  return (
    <section className={`scroll-stack-section ${className}`.trim()} {...restProps}>
      <div className="scroll-stack-inner">
        {childArray.map((child, index) => (
          <div
            className="scroll-stack-card-wrapper"
            key={index}
            style={{
              top: `calc(${stackPosition} + ${index * itemStackDistance}px)`,
              marginBottom: index === childArray.length - 1 ? 0 : `${itemDistance}px`
            }}
            ref={wrapperRefCallbacks[index]}
          >
            {isValidElement(child)
              ? cloneElement(child, {
                  ref: cardRefCallbacks[index]
                })
              : child}
          </div>
        ))}
      </div>
    </section>
  );
}
