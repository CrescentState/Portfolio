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
  main.style.cssText = 'min-height: 100vh;';

  main.innerHTML = `
    <section class="hero" data-section="hero" style="
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    ">
      <div class="container" style="position: relative; z-index: 1; text-align: center;">
        <div class="hero-content" style="max-width: 800px; margin: 0 auto;">
          <p class="hero-label" style="
            display: inline-block;
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-semibold);
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: var(--color-accent);
            margin-bottom: var(--spacing-4);
            opacity: 0;
            transform: translateY(20px);
          ">Creative Developer</p>
          
          <h1 class="hero-title" style="
            font-size: clamp(var(--font-size-4xl), 8vw, var(--font-size-6xl));
            line-height: var(--line-height-tight);
            margin-bottom: var(--spacing-4);
            opacity: 0;
            transform: translateY(30px);
          ">
            ${siteContent.hero.headline}
            <br>
            <span style="color: var(--color-accent);">${siteContent.hero.subheadline}</span>
          </h1>
          
          <p class="hero-description" style="
            font-size: var(--font-size-lg);
            line-height: var(--line-height-relaxed);
            color: var(--color-text-muted);
            max-width: 600px;
            margin: 0 auto var(--spacing-7);
            opacity: 0;
            transform: translateY(20px);
          ">${siteContent.hero.description}</p>
          
          <div class="hero-cta" style="
            display: flex;
            gap: var(--spacing-3);
            justify-content: center;
            flex-wrap: wrap;
            opacity: 0;
            transform: translateY(20px);
          ">
            <a href="${siteContent.hero.cta.href}" class="btn btn--primary btn--large">${siteContent.hero.cta.label}</a>
            <a href="/about" class="btn btn--secondary btn--large">About Me</a>
          </div>
        </div>
      </div>

      <div class="hero-scroll-indicator" style="
        position: absolute;
        bottom: var(--spacing-6);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-2);
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        opacity: 0;
        animation: bounce 2s ease-in-out infinite;
      ">
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="animation: bounceArrow 2s ease-in-out infinite;">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>

      <canvas id="hero-canvas" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      "></canvas>
    </section>

    <section class="section featured-work" data-section="featured-work" style="padding: var(--spacing-8) 0;">
      <div class="container">
        <header class="section__header">
          <p class="section__label">Featured Work</p>
          <h2 class="section__title">${siteContent.work.title}</h2>
          <p class="section__description">A selection of projects I've crafted recently</p>
        </header>
        
        <div class="grid grid--2" style="gap: var(--spacing-5);" id="featured-projects">
          ${siteContent.work.projects.filter(p => p.featured).map(project => createProjectCard(project)).join('')}
        </div>
        
        <div style="text-align: center; margin-top: var(--spacing-7);">
          <a href="/work" class="btn btn--secondary btn--large">View All Projects</a>
        </div>
      </div>
    </section>

    <section class="section about-preview" data-section="about-preview" style="
      padding: var(--spacing-8) 0;
      background: var(--color-surface);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    ">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-8); align-items: center;">
          <div>
            <p class="section__label" style="text-align: left;">About Me</p>
            <h2 class="section__title" style="text-align: left; max-width: none;">${siteContent.about.title}</h2>
            <p style="color: var(--color-text-muted); margin-top: var(--spacing-3); font-size: var(--font-size-lg);">${siteContent.about.bio[0]}</p>
            <p style="color: var(--color-text-muted); margin-top: var(--spacing-3);">${siteContent.about.bio[1]}</p>
            <a href="/about" class="btn btn--primary" style="margin-top: var(--spacing-5);">Learn More</a>
          </div>
          <div class="stats" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-4);">
            ${siteContent.about.stats.map(stat => `
              <div style="padding: var(--spacing-4); background: var(--color-primary); border: 1px solid var(--color-border); border-radius: var(--spacing-2); text-align: center;">
                <div style="font-family: var(--font-display); font-size: var(--font-size-4xl); font-weight: var(--font-weight-bold); color: var(--color-accent); line-height: 1;">${stat.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-top: var(--spacing-1);">${stat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="section cta" data-section="cta" style="padding: var(--spacing-8) 0; text-align: center;">
      <div class="container">
        <h2 style="margin-bottom: var(--spacing-3);">Ready to start a project?</h2>
        <p style="color: var(--color-text-muted); font-size: var(--font-size-lg); max-width: 600px; margin: 0 auto var(--spacing-6);">
          ${siteContent.contact.description}
        </p>
        <a href="/contact" class="btn btn--primary btn--large">${siteContent.contact.form.submitLabel}</a>
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

  const heroElements = main.querySelectorAll('.hero-label, .hero-title, .hero-description, .hero-cta, .hero-scroll-indicator');
  
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

  initHeroCanvas(main);
}

function initHeroCanvas(main: HTMLElement) {
  const canvas = main.querySelector('#hero-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let animationId: number;
  let mouseX = width / 2;
  let mouseY = height / 2;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseRadius: number;
    color: string;
    alpha: number;
  }

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx!.scale(devicePixelRatio, devicePixelRatio);
    initParticles();
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((width * height) / 15000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
        baseRadius: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? '#00d4aa' : '#f0f0f5',
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function animate() {
    ctx!.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const force = (150 - dist) / 150 * 0.5;
        p.vx -= dx / dist * force;
        p.vy -= dy / dist * force;
        p.radius = p.baseRadius * (1 + force);
        p.alpha = Math.min(1, p.alpha + 0.02);
      } else {
        p.radius = p.baseRadius;
        p.alpha = Math.max(0.1, p.alpha - 0.01);
      }

      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = p.alpha;
      ctx!.fill();
      ctx!.globalAlpha = 1;

      particles.forEach(p2 => {
        if (p === p2) return;
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.strokeStyle = p.color;
          ctx!.globalAlpha = (1 - dist / 120) * 0.15;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
          ctx!.globalAlpha = 1;
        }
      });
    });

    animationId = requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = width / 2;
    mouseY = height / 2;
  });

  window.addEventListener('resize', resize);
  resize();
  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}