/// <reference types="vite/client" />

export interface AppContext {
  lenis: LenisInstance;
  scrollController: ScrollControllerInstance;
}

export interface LenisInstance {
  on: (event: 'scroll' | 'virtual-scroll', callback: (e: any) => void) => () => void;
  off: (event: 'scroll' | 'virtual-scroll', callback: (e: any) => void) => void;
  scrollTo: (target: number | string | HTMLElement, options?: {
    offset?: number;
    immediate?: boolean;
    lock?: boolean;
    duration?: number;
    easing?: (t: number) => number;
    lerp?: number;
    onStart?: () => void;
    onComplete?: () => void;
    force?: boolean;
    userData?: Record<string, unknown>;
  }) => void;
  stop: () => void;
  start: () => void;
  raf: (time: number) => void;
  resize: () => void;
}

export interface ScrollControllerInstance {
  progress: number;
  sectionProgress: number;
  activeSection: string | null;
  direction: 'up' | 'down' | 'none';
  velocity: number;
  isScrolling: boolean;
  subscribe: (callback: ScrollCallback) => () => void;
  getSectionProgress: (sectionId: string) => number;
}

export type ScrollCallback = (data: ScrollControllerInstance) => void;

export interface Route {
  path: string;
  component: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured: boolean;
}