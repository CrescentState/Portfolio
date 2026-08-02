import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';

export default {
  mount(container: HTMLElement, context: any) {
    container.innerHTML = '';
    container.appendChild(createHeader());
    container.appendChild(createMain());
    container.appendChild(createFooter());
    
    initAnimations();
  },
  unmount() {},
};

function createMain(): HTMLElement {
  const main = document.createElement('main');
  main.id = 'main-content';
  main.style.cssText = 'min-height: 100vh; min-height: 100dvh; display: flex; align-items: center; justify-content: center;';

  main.innerHTML = `
    <section style="text-align: center; padding: var(--spacing-8) var(--container-padding);">
      <div style="max-width: 400px; margin: 0 auto;">
        <div style="font-size: 12rem; font-weight: var(--font-weight-bold); line-height: 1; color: var(--color-accent); margin-bottom: var(--spacing-4); opacity: 0; transform: translateY(20px);" class="error-code">404</div>
        <h1 style="margin-bottom: var(--spacing-3); opacity: 0; transform: translateY(20px);" class="error-title">Page Not Found</h1>
        <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-6); opacity: 0; transform: translateY(20px);" class="error-description">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div style="display: flex; gap: var(--spacing-3); justify-content: center; flex-wrap: wrap; opacity: 0; transform: translateY(20px);" class="error-actions">
          <a href="/" class="btn btn--primary btn--large">Go Home</a>
          <a href="/work" class="btn btn--secondary btn--large">Browse Work</a>
        </div>
        <div style="margin-top: var(--spacing-8); padding: var(--spacing-5); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--spacing-2); opacity: 0; transform: translateY(20px);" class="error-fun">
          <p style="font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted); margin: 0;">
            <span style="color: var(--color-accent);">></span> console.log(<span style="color: #ffa502;">'Lost?'</span>)<br>
            <span style="color: var(--color-accent);">></span> window.location.href = <span style="color: #ffa502;">'/'</span>
          </p>
        </div>
      </div>
    </section>
  `;

  return main;
}

function initAnimations() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const elements = main.querySelectorAll('.error-code, .error-title, .error-description, .error-actions, .error-fun');
  
  elements.forEach((el, i) => {
    (el as HTMLElement).style.transition = `opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
    
    requestAnimationFrame(() => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  });

  const errorCode = main.querySelector('.error-code');
  if (errorCode) {
    let hoverCount = 0;
    errorCode.addEventListener('mouseenter', () => {
      hoverCount++;
      const colors = ['#00d4aa', '#ff4757', '#ffa502', '#2ed573', '#1e90ff'];
      (errorCode as HTMLElement).style.color = colors[hoverCount % colors.length];
      (errorCode as HTMLElement).style.transition = 'color 0.3s ease';
    });
  }
}