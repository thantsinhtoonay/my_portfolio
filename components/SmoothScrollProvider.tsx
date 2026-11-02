'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollAction = (target: string) => void;
const SmoothScrollContext = createContext<SmoothScrollAction>(() => undefined);

export function useSmoothScroll(): SmoothScrollAction {
  return useContext(SmoothScrollContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (time: number) => lenis.raf(time * 1000);
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: SmoothScrollAction = useCallback((target) => {
    const destination = document.querySelector<HTMLElement>(target);
    if (!destination) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      destination.scrollIntoView({ block: 'start', behavior: 'auto' });
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(destination, {
        offset: -82,
        duration: 1.25,
        easing: (progress) => 1 - Math.pow(1 - progress, 4),
      });
      return;
    }

    destination.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  return <SmoothScrollContext.Provider value={scrollTo}>{children}</SmoothScrollContext.Provider>;
}
