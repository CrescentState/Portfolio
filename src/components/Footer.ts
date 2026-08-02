import { siteContent } from '../content/inventory';

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.style.cssText = `
    background: var(--color-primary);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-8) 0 var(--spacing-5);
  `;

  footer.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--spacing-7); margin-bottom: var(--spacing-8);">
        <div class="footer-brand">
          <a href="/" class="logo" style="
            font-family: var(--font-display);
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-bold);
            color: var(--color-text);
            text-decoration: none;
            display: inline-block;
            margin-bottom: var(--spacing-3);
          ">Alen</a>
          <p style="color: var(--color-text-muted); font-size: var(--font-size-base); line-height: var(--line-height-relaxed); max-width: 300px;">
            ${siteContent.footer.credits}
          </p>
        </div>

        <div class="footer-links">
          <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text); margin-bottom: var(--spacing-4);">Work</h4>
          <nav style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            ${siteContent.work.projects.filter(p => p.featured).map(project => `
              <a href="${project.link}" style="color: var(--color-text-muted); font-size: var(--font-size-sm); text-decoration: none; transition: color var(--transition-fast);">${project.title}</a>
            `).join('')}
            <a href="/work" style="color: var(--color-text-muted); font-size: var(--font-size-sm); text-decoration: none; transition: color var(--transition-fast);">View All Projects</a>
          </nav>
        </div>

        <div class="footer-links">
          <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text); margin-bottom: var(--spacing-4);">Connect</h4>
          <nav style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            ${siteContent.contact.social.map(social => `
              <a href="${social.url}" target="_blank" rel="noopener noreferrer" style="color: var(--color-text-muted); font-size: var(--font-size-sm); text-decoration: none; transition: color var(--transition-fast);">${social.platform}</a>
            `).join('')}
          </nav>
        </div>

        <div class="footer-links">
          <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text); margin-bottom: var(--spacing-4);">Legal</h4>
          <nav style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            <a href="/privacy" style="color: var(--color-text-muted); font-size: var(--font-size-sm); text-decoration: none; transition: color var(--transition-fast);">Privacy Policy</a>
            <a href="/terms" style="color: var(--color-text-muted); font-size: var(--font-size-sm); text-decoration: none; transition: color var(--transition-fast);">Terms of Service</a>
            <a href="/cookies" style="color: var(--color-text-muted); font-size: var(--font-size-sm); text-decoration: none; transition: color var(--transition-fast);">Cookie Policy</a>
          </nav>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-3); padding-top: var(--spacing-5); border-top: 1px solid var(--color-border);">
        <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">${siteContent.footer.copyright}</p>
        <div class="footer-social" style="display: flex; gap: var(--spacing-4);">
          ${siteContent.contact.social.map(social => `
            <a href="${social.url}" target="_blank" rel="noopener noreferrer" aria-label="${social.platform}" style="
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid var(--color-border);
              border-radius: 50%;
              color: var(--color-text-muted);
              transition: all var(--transition-fast);
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${getSocialIcon(social.platform)}</svg>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  footer.querySelectorAll('.footer-links a, .footer-brand a:not(.logo)').forEach(link => {
    link.addEventListener('mouseenter', () => {
      (link as HTMLElement).style.color = 'var(--color-accent)';
    });
    link.addEventListener('mouseleave', () => {
      (link as HTMLElement).style.color = 'var(--color-text-muted)';
    });
  });

  footer.querySelectorAll('.footer-social a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      (link as HTMLElement).style.borderColor = 'var(--color-accent)';
      (link as HTMLElement).style.color = 'var(--color-accent)';
    });
    link.addEventListener('mouseleave', () => {
      (link as HTMLElement).style.borderColor = 'var(--color-border)';
      (link as HTMLElement).style.color = 'var(--color-text-muted)';
    });
  });

  return footer;
}

function getSocialIcon(platform: string): string {
  const icons: Record<string, string> = {
    GitHub: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    Twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
    LinkedIn: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    Email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    Wellfound: '<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/><path d="M12 16v-2.5a2.5 2.5 0 0 0-2.5-2.5h-1.5a2.5 2.5 0 0 0 0 5H12V16z"/>',
  };
  return icons[platform] || icons.Email;
}