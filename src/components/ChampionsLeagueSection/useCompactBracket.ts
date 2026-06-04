import { useEffect, useRef, useState } from 'react';

export type CompactStageKey = 'LAST_16' | 'QUARTER_FINALS' | 'SEMI_FINALS' | 'FINAL';

const COMPACT_BRACKET_BREAKPOINT = 1450;

export function useCompactBracket() {
  const [activeCompactStage, setActiveCompactStage] = useState<CompactStageKey>('LAST_16');
  const [isCompactBracket, setIsCompactBracket] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= COMPACT_BRACKET_BREAKPOINT : false
  );
  const compactViewportRef = useRef<HTMLDivElement | null>(null);
  const wasCompactBracketRef = useRef(isCompactBracket);
  const compactStageRefs = useRef<Record<CompactStageKey, HTMLDivElement | null>>({
    LAST_16: null,
    QUARTER_FINALS: null,
    SEMI_FINALS: null,
    FINAL: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${COMPACT_BRACKET_BREAKPOINT}px)`);

    const handleChange = (event?: MediaQueryListEvent) => {
      setIsCompactBracket(event ? event.matches : mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  function scrollToCompactStage(stage: CompactStageKey, behavior: ScrollBehavior = 'smooth') {
    const viewport = compactViewportRef.current;
    const stageElement = compactStageRefs.current[stage];

    if (!viewport || !stageElement) return;

    const viewportRect = viewport.getBoundingClientRect();
    const stageRect = stageElement.getBoundingClientRect();
    const nextLeft = viewport.scrollLeft + (stageRect.left - viewportRect.left);

    viewport.scrollTo({
      left: nextLeft,
      behavior,
    });
  }

  function getCompactStageRef(stage: CompactStageKey) {
    return (node: HTMLDivElement | null) => {
      compactStageRefs.current[stage] = node;
    };
  }

  useEffect(() => {
    if (!isCompactBracket) return;

    const frameId = window.requestAnimationFrame(() => {
      const behavior: ScrollBehavior = wasCompactBracketRef.current ? 'smooth' : 'auto';
      scrollToCompactStage(activeCompactStage, behavior);
      wasCompactBracketRef.current = true;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [activeCompactStage, isCompactBracket]);

  useEffect(() => {
    if (!isCompactBracket) {
      wasCompactBracketRef.current = false;
    }
  }, [isCompactBracket]);

  return {
    activeCompactStage,
    compactViewportRef,
    getCompactStageRef,
    isCompactBracket,
    setActiveCompactStage,
  };
}
