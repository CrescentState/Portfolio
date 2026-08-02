import { siteContent } from '../content/inventory';
import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';

export default {
  mount(container: HTMLElement, context: any) {
    const path = window.location.pathname;
    const slug = path.replace('/work/', '');
    const project = siteContent.work.projects.find(p => p.id === slug);
    
    container.innerHTML = '';
    container.appendChild(createHeader());
    container.appendChild(createMain(project));
    container.appendChild(createFooter());
    
    initAnimations();
  },
  unmount() {},
};

function createMain(project: any): HTMLElement {
  const main = document.createElement('main');
  main.id = 'main-content';

  if (!project) {
    main.innerHTML = `
      <section class="hero" style="min-height: 60vh; display: flex; align-items: center; justify-content: center; text-align: center;">
        <div class="container">
          <h1 style="margin-bottom: var(--spacing-3);">Project Not Found</h1>
          <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-5);">The project you're looking for doesn't exist.</p>
          <a href="/work" class="btn btn--primary">Back to Work</a>
        </div>
      </section>
    `;
    return main;
  }

  main.innerHTML = `
    <section class="hero" data-section="project-hero" style="
      min-height: 70vh;
      display: flex;
      align-items: flex-end;
      position: relative;
      padding: var(--spacing-8) 0 var(--spacing-5);
    ">
      <div class="container" style="position: relative; z-index: 1;">
        <div style="max-width: 800px;">
          <p class="section__label" style="opacity: 0; transform: translateY(20px);">${project.category}</p>
          <h1 class="hero-title" style="
            font-size: clamp(var(--font-size-4xl), 6vw, var(--font-size-5xl));
            margin: var(--spacing-3) 0 var(--spacing-4);
            opacity: 0;
            transform: translateY(30px);
          ">${project.title}</h1>
          <p class="hero-description" style="
            font-size: var(--font-size-lg);
            max-width: 600px;
            opacity: 0;
            transform: translateY(20px);
          ">${project.description}</p>
          <div class="project-meta" style="display: flex; flex-wrap: wrap; gap: var(--spacing-3); margin-top: var(--spacing-5); opacity: 0; transform: translateY(20px);">
            ${project.tags.map((tag: string) => `<span class="tag tag--primary">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="hero-image" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
      ">
        <img src="${project.image}" alt="${project.title}" style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.1);
          transition: transform 2s cubic-bezier(0.25, 0.1, 0.25, 1);
        ">
      </div>
    </section>

    <section class="section" data-section="project-details" style="padding: var(--spacing-8) 0;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--spacing-8);">
          <div>
            <h2 style="margin-bottom: var(--spacing-4);">Project Details</h2>
            <p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin-bottom: var(--spacing-5);">
              ${project.description}
            </p>
            <p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin-bottom: var(--spacing-5);">
              This project was built with a focus on performance, accessibility, and creating an engaging user experience. 
              The interactive elements are powered by modern web technologies including Three.js for 3D graphics, 
              GSAP for smooth animations, and custom shaders for visual effects.
            </p>
            <p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed);">
              The development process involved extensive research into web performance optimization, 
              ensuring the experience remains smooth across devices while delivering a premium feel.
            </p>
          </div>
          <div>
            <h3 style="font-size: var(--font-size-lg); margin-bottom: var(--spacing-4);">Technologies</h3>
            <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2); margin-bottom: var(--spacing-6);">
              ${project.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div style="padding: var(--spacing-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--spacing-2);">
              <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--spacing-3);">Links</p>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
                <a href="${project.link}" class="btn btn--primary" style="text-align: center; justify-content: center;">View Live</a>
                <a href="#" class="btn btn--secondary" style="text-align: center; justify-content: center;">View Code</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" data-section="project-nav" style="padding: var(--spacing-6) 0; border-top: 1px solid var(--color-border);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--spacing-3);">
          <a href="/work" class="btn btn--ghost">← Back to All Work</a>
          <div style="display: flex; gap: var(--spacing-3);">
            <a href="#" class="btn btn--secondary">Previous Project</a>
            <a href="#" class="btn btn--primary">Next Project</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return main;
}

function initAnimations() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const heroElements = main.querySelectorAll('.section__label, .hero-title, .hero-description, .project-meta');
  
  heroElements.forEach((el, i) => {
    (el as HTMLElement).style.transition = `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
    
    requestAnimationFrame(() => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  });

  const heroImage = main.querySelector('.hero-image img');
  if (heroImage) {
    setTimeout(() => {
      (heroImage as HTMLElement).style.transform = 'scale(1)';
    }, 300);
  }

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

  main.querySelectorAll('[data-section="project-details"] > .container > div > div').forEach((el, i) => {
    (el as HTMLElement).style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
    (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.transform = 'translateY(20px)';
    observer.observe(el);
  });
}