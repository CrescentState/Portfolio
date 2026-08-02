import { siteContent } from '../content/inventory';
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

  main.innerHTML = `
    <section class="hero" data-section="work-hero" style="
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      padding: var(--spacing-8) 0;
    ">
      <div class="container" style="position: relative; z-index: 1;">
        <p class="section__label" style="opacity: 0; transform: translateY(20px);">Selected Work</p>
        <h1 class="hero-title" style="
          font-size: clamp(var(--font-size-4xl), 6vw, var(--font-size-5xl));
          margin: var(--spacing-3) 0 var(--spacing-4);
          opacity: 0;
          transform: translateY(30px);
        ">${siteContent.work.title}</h1>
        <p class="hero-description" style="
          font-size: var(--font-size-lg);
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
        ">Each project represents a unique challenge solved through code, design, and creative thinking.</p>
      </div>
    </section>

    <section class="section" data-section="work-grid" style="padding: var(--spacing-8) 0;">
      <div class="container">
        <div class="grid grid--2" style="gap: var(--spacing-5);" id="work-grid">
          ${siteContent.work.projects.map(project => createProjectCard(project)).join('')}
        </div>
      </div>
    </section>

    <section class="section cta" data-section="work-cta" style="padding: var(--spacing-8) 0; text-align: center; background: var(--color-surface); border-top: 1px solid var(--color-border);">
      <div class="container">
        <h2 style="margin-bottom: var(--spacing-3);">Have a project in mind?</h2>
        <p style="color: var(--color-text-muted); font-size: var(--font-size-lg); max-width: 600px; margin: 0 auto var(--spacing-6);">
          I'm always open to discussing new opportunities and interesting challenges.
        </p>
        <a href="/contact" class="btn btn--primary btn--large">Start a Conversation</a>
      </div>
    </section>
  `;

  return main;
}

function createProjectCard(project: any): string {
  return `
    <article class="card" style="opacity: 0; transform: translateY(30px);" data-project="${project.id}">
      <div style="position: relative; overflow: hidden;">
        <img src="${project.image}" alt="${project.title}" class="card__image" style="width: 100%; aspect-ratio: 16/10; object-fit: cover;">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(5,5,8,0.8) 100%); opacity: 0; transition: opacity var(--transition-normal);"></div>
      </div>
      <div class="card__content">
        <span class="card__category">${project.category}</span>
        <h3 class="card__title">${project.title}</h3>
        <p class="card__description">${project.description}</p>
        <div class="card__tags">
          ${project.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.link}" class="btn btn--ghost" style="font-size: var(--font-size-sm); padding: var(--spacing-1) var(--spacing-3);">View Project</a>
      </div>
    </article>
  `;
}

function initAnimations() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const heroElements = main.querySelectorAll('.section__label, .hero-title, .hero-description');
  
  heroElements.forEach((el, i) => {
    (el as HTMLElement).style.transition = `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
    
    requestAnimationFrame(() => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  main.querySelectorAll('.card').forEach((card, i) => {
    (card as HTMLElement).style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
    (card as HTMLElement).style.transitionDelay = `${i * 100}ms`;
    observer.observe(card);
  });

  main.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const overlay = card.querySelector('div[style*="linear-gradient"]') as HTMLElement;
      if (overlay) overlay.style.opacity = '1';
      const img = card.querySelector('.card__image') as HTMLElement;
      if (img) img.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      const overlay = card.querySelector('div[style*="linear-gradient"]') as HTMLElement;
      if (overlay) overlay.style.opacity = '0';
      const img = card.querySelector('.card__image') as HTMLElement;
      if (img) img.style.transform = 'scale(1)';
    });
  });
}