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
    <section class="hero" data-section="about-hero" style="
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      padding: var(--spacing-8) 0;
    ">
      <div class="container" style="position: relative; z-index: 1;">
        <p class="section__label" style="opacity: 0; transform: translateY(20px);">About Me</p>
        <h1 class="hero-title" style="
          font-size: clamp(var(--font-size-4xl), 6vw, var(--font-size-5xl));
          margin: var(--spacing-3) 0 var(--spacing-4);
          opacity: 0;
          transform: translateY(30px);
        ">${siteContent.about.title}</h1>
        <p class="hero-description" style="
          font-size: var(--font-size-lg);
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
        ">${siteContent.about.bio[0]}</p>
      </div>
    </section>

    <section class="section" data-section="about-bio" style="padding: var(--spacing-8) 0;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-8); align-items: start;">
          <div>
            ${siteContent.about.bio.slice(1).map((paragraph, i) => `
              <p style="color: var(--color-text-muted); line-height: var(--line-height-relaxed); margin-bottom: var(--spacing-4); opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: ${i * 100}ms;" class="bio-paragraph">
                ${paragraph}
              </p>
            `).join('')}
          </div>
          <div>
            <h3 style="font-size: var(--font-size-xl); margin-bottom: var(--spacing-4); opacity: 0; transform: translateY(20px);" class="skills-title">Skills & Technologies</h3>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-5);">
              ${siteContent.about.skills.map((skillGroup, i) => `
                <div style="opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: ${(i + 2) * 100}ms;" class="skill-group">
                  <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); margin-bottom: var(--spacing-2);">${skillGroup.category}</h4>
                  <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2);">
                    ${skillGroup.items.map(item => `<span class="tag">${item}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" data-section="about-stats" style="padding: var(--spacing-8) 0; background: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-4); text-align: center;">
          ${siteContent.about.stats.map((stat, i) => `
            <div style="opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: ${i * 100}ms;" class="stat-item">
              <div style="font-family: var(--font-display); font-size: var(--font-size-4xl); font-weight: var(--font-weight-bold); color: var(--color-accent); line-height: 1;">${stat.value}</div>
              <div style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-top: var(--spacing-1);">${stat.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section cta" data-section="about-cta" style="padding: var(--spacing-8) 0; text-align: center;">
      <div class="container">
        <h2 style="margin-bottom: var(--spacing-3);">Want to work together?</h2>
        <p style="color: var(--color-text-muted); font-size: var(--font-size-lg); max-width: 600px; margin: 0 auto var(--spacing-6);">
          I'm always interested in new projects and collaborations. Let's create something amazing.
        </p>
        <a href="/contact" class="btn btn--primary btn--large">Get In Touch</a>
      </div>
    </section>
  `;

  return main;
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

  main.querySelectorAll('.bio-paragraph, .skill-group, .stat-item').forEach(el => {
    observer.observe(el);
  });
}