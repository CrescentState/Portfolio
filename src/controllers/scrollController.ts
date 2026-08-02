import type { ScrollControllerInstance, ScrollCallback } from '../types';

interface SectionData {
  id: string;
  element: HTMLElement;
  top: number;
  bottom: number;
  height: number;
  progress: number;
}

class ScrollController implements ScrollControllerInstance {
  progress = 0;
  sectionProgress = 0;
  activeSection: string | null = null;
  direction: 'up' | 'down' | 'none' = 'none';
  velocity = 0;
  isScrolling = false;

  private subscribers = new Set<ScrollCallback>();
  private sections: SectionData[] = [];
  private lastProgress = 0;
  private lastTime = 0;
  private rafId: number | null = null;
  private debugOverlay: HTMLElement | null = null;
  private showDebug = false;

  constructor() {
    this.initDebugOverlay();
    this.bindKeyboardShortcuts();
  }

  private initDebugOverlay() {
    this.debugOverlay = document.createElement('div');
    this.debugOverlay.id = 'scroll-debug-overlay';
    this.debugOverlay.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 9999;
      background: rgba(5, 5, 8, 0.95);
      border: 1px solid #2a2a3e;
      border-radius: 8px;
      padding: 16px;
      font-family: "JetBrains Mono", monospace;
      font-size: 11px;
      line-height: 1.6;
      color: #f0f0f5;
      min-width: 220px;
      pointer-events: none;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;
    this.debugOverlay.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #2a2a3e;">
        <strong style="color: #00d4aa;">SCROLL DEBUG</strong>
        <button id="debug-close" style="background: none; border: none; color: #888; cursor: pointer; font-size: 14px; line-height: 1;">×</button>
      </div>
      <div><span style="color: #888;">Progress:</span> <span id="debug-progress" style="color: #00d4aa; font-weight: 600;">0.0000</span> (<span id="debug-progress-pct">0.00%</span>)</div>
      <div><span style="color: #888;">Section:</span> <span id="debug-section" style="color: #fff;">—</span></div>
      <div><span style="color: #888;">Section Progress:</span> <span id="debug-section-progress" style="color: #00d4aa;">0.00</span></div>
      <div><span style="color: #888;">Direction:</span> <span id="debug-direction" style="color: #fff;">—</span></div>
      <div><span style="color: #888;">Velocity:</span> <span id="debug-velocity" style="color: #fff;">0</span></div>
      <div><span style="color: #888;">Scrolling:</span> <span id="debug-scrolling" style="color: #fff;">false</span></div>
      <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #2a2a3e;">
        <div><span style="color: #888;">FPS:</span> <span id="debug-fps" style="color: #2ed573;">60</span></div>
        <div><span style="color: #888;">Sections:</span> <span id="debug-sections-count" style="color: #fff;">0</span></div>
      </div>
    `;
    document.body.appendChild(this.debugOverlay);

    const closeBtn = this.debugOverlay.querySelector('#debug-close');
    closeBtn?.addEventListener('click', () => this.toggleDebug(false));
  }

  private bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'd' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        this.toggleDebug(!this.showDebug);
      }
    });
  }

  toggleDebug(show?: boolean) {
    this.showDebug = show ?? !this.showDebug;
    if (this.debugOverlay) {
      this.debugOverlay.style.transform = this.showDebug ? 'translateX(0)' : 'translateX(120%)';
    }
  }

  private updateDebugOverlay() {
    if (!this.debugOverlay || !this.showDebug) return;

    const fps = this.calculateFPS();
    
    (this.debugOverlay.querySelector('#debug-progress') as HTMLElement).textContent = this.progress.toFixed(4);
    (this.debugOverlay.querySelector('#debug-progress-pct') as HTMLElement).textContent = (this.progress * 100).toFixed(2) + '%';
    (this.debugOverlay.querySelector('#debug-section') as HTMLElement).textContent = this.activeSection || '—';
    (this.debugOverlay.querySelector('#debug-section-progress') as HTMLElement).textContent = this.sectionProgress.toFixed(2);
    (this.debugOverlay.querySelector('#debug-direction') as HTMLElement).textContent = this.direction.toUpperCase();
    (this.debugOverlay.querySelector('#debug-velocity') as HTMLElement).textContent = this.velocity.toFixed(2);
    (this.debugOverlay.querySelector('#debug-scrolling') as HTMLElement).textContent = this.isScrolling.toString();
    (this.debugOverlay.querySelector('#debug-fps') as HTMLElement).textContent = fps.toString();
    (this.debugOverlay.querySelector('#debug-sections-count') as HTMLElement).textContent = this.sections.length.toString();

    const fpsEl = this.debugOverlay.querySelector('#debug-fps') as HTMLElement;
    if (fps < 30) fpsEl.style.color = '#ff4757';
    else if (fps < 50) fpsEl.style.color = '#ffa502';
    else fpsEl.style.color = '#2ed573';
  }

  private calculateFPS(): number {
    const now = performance.now();
    const fps = 1000 / (now - this.lastTime) || 60;
    this.lastTime = now;
    return Math.round(fps);
  }

  registerSection(element: HTMLElement, id: string) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    this.sections.push({
      id,
      element,
      top: rect.top + scrollTop,
      bottom: rect.bottom + scrollTop,
      height: rect.height,
      progress: 0,
    });

    this.sections.sort((a, b) => a.top - b.top);
    
    if (import.meta.env.DEV) {
      console.log(`[ScrollController] Registered section: ${id}`, { top: this.sections[this.sections.length - 1].top, height: this.sections[this.sections.length - 1].height });
    }
  }

  unregisterSection(id: string) {
    this.sections = this.sections.filter(s => s.id !== id);
  }

  refreshSections() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.sections.forEach(section => {
      const rect = section.element.getBoundingClientRect();
      section.top = rect.top + scrollTop;
      section.bottom = rect.bottom + scrollTop;
      section.height = rect.height;
    });
    this.sections.sort((a, b) => a.top - b.top);
  }

  update(progress: number, velocity: number = 0) {
    this.lastProgress = this.progress;
    this.progress = Math.max(0, Math.min(1, progress));
    this.velocity = velocity;
    this.direction = this.progress > this.lastProgress ? 'down' : this.progress < this.lastProgress ? 'up' : 'none';
    this.isScrolling = Math.abs(velocity) > 0.1;

    this.updateActiveSection();
    this.updateDebugOverlay();
    this.notifySubscribers();
  }

  private updateActiveSection() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const scrollCenter = scrollTop + viewportHeight / 2;

    let newActiveSection: string | null = null;
    let maxIntersection = 0;

    this.sections.forEach(section => {
      const intersectionStart = Math.max(section.top, scrollTop);
      const intersectionEnd = Math.min(section.bottom, scrollTop + viewportHeight);
      const intersection = Math.max(0, intersectionEnd - intersectionStart);

      if (intersection > maxIntersection) {
        maxIntersection = intersection;
        newActiveSection = section.id;
      }

      const sectionStart = section.top;
      const sectionEnd = section.bottom;
      const sectionScrollProgress = (scrollCenter - sectionStart) / (sectionEnd - sectionStart);
      section.progress = Math.max(0, Math.min(1, sectionScrollProgress));
    });

    if (newActiveSection !== this.activeSection) {
      this.activeSection = newActiveSection;
    }

    if (this.activeSection) {
      const activeSectionData = this.sections.find(s => s.id === this.activeSection);
      this.sectionProgress = activeSectionData?.progress || 0;
    } else {
      this.sectionProgress = 0;
    }
  }

  subscribe(callback: ScrollCallback): () => void {
    this.subscribers.add(callback);
    callback(this);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach(cb => cb(this));
  }

  getSectionProgress(sectionId: string): number {
    const section = this.sections.find(s => s.id === sectionId);
    return section?.progress || 0;
  }

  destroy() {
    this.subscribers.clear();
    this.sections = [];
    if (this.debugOverlay) {
      this.debugOverlay.remove();
      this.debugOverlay = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

let scrollControllerInstance: ScrollController | null = null;

export function initScrollController(lenis: any): ScrollControllerInstance {
  if (scrollControllerInstance) return scrollControllerInstance;

  scrollControllerInstance = new ScrollController();

  lenis.on('scroll', (e: any) => {
    scrollControllerInstance!.update(e.progress, e.velocity);
  });

  window.addEventListener('resize', () => {
    scrollControllerInstance!.refreshSections();
  });

  if (import.meta.env.DEV) {
    console.log('[ScrollController] Initialized');
    console.log('[ScrollController] Press Ctrl/Cmd + Shift + D to toggle debug overlay');
  }

  return scrollControllerInstance;
}

export function getScrollController(): ScrollControllerInstance | null {
  return scrollControllerInstance;
}

export function destroyScrollController() {
  if (scrollControllerInstance) {
    scrollControllerInstance.destroy();
    scrollControllerInstance = null;
  }
}