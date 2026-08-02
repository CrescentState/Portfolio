import Lenis from 'lenis';
import type { LenisInstance } from '../types';

let lenisInstance: LenisInstance | null = null;

export function initLenis(): LenisInstance {
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: false,
    touchMultiplier: 2,
    infinite: false,
    autoRaf: false,
  });

  lenisInstance = {
    on: lenis.on.bind(lenis) as LenisInstance['on'],
    off: lenis.off.bind(lenis) as LenisInstance['off'],
    scrollTo: lenis.scrollTo.bind(lenis) as LenisInstance['scrollTo'],
    stop: lenis.stop.bind(lenis),
    start: lenis.start.bind(lenis),
    raf: lenis.raf.bind(lenis),
    resize: lenis.resize.bind(lenis),
  };

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  if (import.meta.env.DEV) {
    console.log('[Lenis] Initialized');
  }

  return lenisInstance!;
}

export function getLenis(): LenisInstance | null {
  return lenisInstance;
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.stop();
    lenisInstance = null;
  }
}