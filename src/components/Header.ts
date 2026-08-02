import { siteContent } from '../content/inventory';

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    z-index: var(--z-sticky);
    background: rgba(5, 5, 8, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--color-border);
    transition: transform var(--transition-normal), background var(--transition-normal);
  `;

  header.innerHTML = `
    <div class="container" style="height: 100%; display: flex; align-items: center; justify-content: space-between;">
      <a href="/" class="logo" style="
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text);
        text-decoration: none;
        letter-spacing: -0.02em;
      ">
        Alen
      </a>
      
      <nav class="nav-desktop" style="display: none; gap: var(--spacing-6);">
        ${siteContent.navigation.map(item => `
          <a href="${item.href}" class="nav-link" style="
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-medium);
            color: var(--color-text-muted);
            text-decoration: none;
            transition: color var(--transition-fast);
            position: relative;
          ">${item.label}</a>
        `).join('')}
      </nav>

      <div class="header-actions" style="display: flex; align-items: center; gap: var(--spacing-3);">
        <a href="/contact" class="btn btn--primary btn--small">Get in Touch</a>
        <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" style="
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
          height: 18px;
          justify-content: center;
          padding: 0;
        ">
          <span style="display: block; width: 100%; height: 2px; background: var(--color-text); border-radius: 2px; transition: all var(--transition-fast);"></span>
          <span style="display: block; width: 60%; height: 2px; background: var(--color-text); border-radius: 2px; transition: all var(--transition-fast);"></span>
          <span style="display: block; width: 100%; height: 2px; background: var(--color-text); border-radius: 2px; transition: all var(--transition-fast);"></span>
        </button>
      </div>
    </div>

    <nav class="nav-mobile" style="
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(5, 5, 8, 0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--color-border);
      padding: var(--spacing-5) var(--container-padding);
      flex-direction: column;
      gap: var(--spacing-4);
    ">
      ${siteContent.navigation.map(item => `
        <a href="${item.href}" class="nav-link-mobile" style="
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          text-decoration: none;
          padding: var(--spacing-2) 0;
          border-bottom: 1px solid var(--color-border);
        ">${item.label}</a>
      `).join('')}
      <a href="/contact" class="btn btn--primary" style="text-align: center; margin-top: var(--spacing-2);">Get in Touch</a>
    </nav>
  `;

  const menuToggle = header.querySelector('.menu-toggle') as HTMLButtonElement;
  const navMobile = header.querySelector('.nav-mobile') as HTMLElement;
  const spans = menuToggle.querySelectorAll('span');

  let isOpen = false;

  menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    navMobile.style.display = isOpen ? 'flex' : 'none';
    
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      spans[1].style.width = '0%';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      spans[1].style.width = '60%';
    }
  });

  header.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menuToggle.setAttribute('aria-expanded', 'false');
      navMobile.style.display = 'none';
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      spans[1].style.width = '60%';
    });
  });

  header.querySelectorAll('.nav-link').forEach(link => {
    const linkEl = link as HTMLElement;
    linkEl.addEventListener('mouseenter', () => {
      linkEl.style.color = 'var(--color-accent)';
    });
    linkEl.addEventListener('mouseleave', () => {
      linkEl.style.color = 'var(--color-text-muted)';
    });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

  return header;
}