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
    initForm();
  },
  unmount() {},
};

function createMain(): HTMLElement {
  const main = document.createElement('main');
  main.id = 'main-content';

  main.innerHTML = `
    <section class="hero" data-section="contact-hero" style="
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      padding: var(--spacing-8) 0;
    ">
      <div class="container" style="position: relative; z-index: 1;">
        <p class="section__label" style="opacity: 0; transform: translateY(20px);">Contact</p>
        <h1 class="hero-title" style="
          font-size: clamp(var(--font-size-4xl), 6vw, var(--font-size-5xl));
          margin: var(--spacing-3) 0 var(--spacing-4);
          opacity: 0;
          transform: translateY(30px);
        ">${siteContent.contact.title}</h1>
        <p class="hero-description" style="
          font-size: var(--font-size-lg);
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
        ">${siteContent.contact.description}</p>
      </div>
    </section>

    <section class="section" data-section="contact-form" style="padding: var(--spacing-8) 0;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-8); align-items: start;">
          <form id="contact-form" class="contact-form" novalidate style="opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);">
            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">
              <div class="input-group">
                <label for="name" class="label">${siteContent.contact.form.fields[0].label}</label>
                <input type="text" id="name" name="name" class="input" required autocomplete="name" placeholder="Your name">
              </div>
              <div class="input-group">
                <label for="email" class="label">${siteContent.contact.form.fields[1].label}</label>
                <input type="email" id="email" name="email" class="input" required autocomplete="email" placeholder="your@email.com">
              </div>
            </div>
            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); margin-top: var(--spacing-4);">
              <div class="input-group">
                <label for="project" class="label">${siteContent.contact.form.fields[2].label}</label>
                <select id="project" name="project" class="input select">
                  ${(siteContent.contact.form.fields[2].options || []).map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join('')}
                </select>
              </div>
              <div class="input-group">
                <label for="budget" class="label">${siteContent.contact.form.fields[3].label}</label>
                <select id="budget" name="budget" class="input select">
                  ${(siteContent.contact.form.fields[3].options || []).map(opt => `<option value="${opt.toLowerCase().replace(/\$|k|\+/g, '')}">${opt}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="input-group" style="margin-top: var(--spacing-4);">
              <label for="message" class="label">${siteContent.contact.form.fields[4].label}</label>
              <textarea id="message" name="message" class="input textarea" required rows="5" placeholder="Tell me about your project..."></textarea>
            </div>
            <div style="margin-top: var(--spacing-5); display: flex; gap: var(--spacing-3);">
              <button type="submit" class="btn btn--primary btn--large" style="flex: 1;">${siteContent.contact.form.submitLabel}</button>
              <button type="reset" class="btn btn--secondary btn--large">Clear</button>
            </div>
            <div id="form-status" style="margin-top: var(--spacing-4); min-height: 24px;"></div>
          </form>

          <div class="contact-info" style="opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 100ms;">
            <h3 style="font-size: var(--font-size-xl); margin-bottom: var(--spacing-4);">Other Ways to Connect</h3>
            <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-6); line-height: var(--line-height-relaxed);">
              Prefer a direct message? Feel free to reach out on any of these platforms.
            </p>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-3); margin-bottom: var(--spacing-8);">
              ${siteContent.contact.social.map(social => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" style="
                  display: flex;
                  align-items: center;
                  gap: var(--spacing-3);
                  padding: var(--spacing-3) var(--spacing-4);
                  background: var(--color-surface);
                  border: 1px solid var(--color-border);
                  border-radius: var(--spacing-2);
                  color: var(--color-text);
                  text-decoration: none;
                  transition: all var(--transition-fast);
                ">
                  <span style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--color-primary); border: 1px solid var(--color-border); border-radius: var(--spacing-1); color: var(--color-accent);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${getSocialIcon(social.platform)}</svg>
                  </span>
                  <span style="font-weight: var(--font-weight-medium);">${social.platform}</span>
                  <span style="margin-left: auto; color: var(--color-text-muted); font-size: var(--font-size-sm);">${social.url.replace('https://', '').replace('mailto:', '')}</span>
                </a>
              `).join('')}
            </div>
            <div style="padding: var(--spacing-5); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--spacing-2);">
              <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); margin-bottom: var(--spacing-3);">Response Time</h4>
              <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); line-height: var(--line-height-relaxed);">
                I typically respond within 24–48 hours during business days. 
                For urgent inquiries, please mention it in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return main;
}

function getSocialIcon(platform: string): string {
  const icons: Record<string, string> = {
    GitHub: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    Twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
    LinkedIn: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    Email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  };
  return icons[platform] || icons.Email;
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

  main.querySelectorAll('.contact-form, .contact-info').forEach(el => {
    observer.observe(el);
  });

  main.querySelectorAll('.contact-info a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      (link as HTMLElement).style.borderColor = 'var(--color-accent)';
      (link as HTMLElement).style.transform = 'translateX(4px)';
    });
    link.addEventListener('mouseleave', () => {
      (link as HTMLElement).style.borderColor = 'var(--color-border)';
      (link as HTMLElement).style.transform = 'translateX(0)';
    });
  });
}

function initForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const status = document.getElementById('form-status');
  
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    status.innerHTML = '';
    status.className = '';
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      status.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--spacing-2); color: var(--color-success);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Thanks for reaching out! I'll get back to you soon.</span>
        </div>
      `;
      form.reset();
    } catch {
      status.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--spacing-2); color: var(--color-error);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span>Something went wrong. Please try again or email me directly.</span>
        </div>
      `;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  form.querySelectorAll('.input').forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
    });
    input.addEventListener('input', () => {
      if ((input as HTMLInputElement).classList.contains('input--error')) {
        validateField(input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
      }
    });
  });
}

function validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean {
  const errorMsg = field.parentNode?.querySelector('.error-message') as HTMLElement;
  if (errorMsg) errorMsg.remove();
  
  field.classList.remove('input--error');
  
  if (field.required && !field.value.trim()) {
    field.classList.add('input--error');
    const msg = document.createElement('span');
    msg.className = 'error-message';
    msg.textContent = `${field.labels?.[0]?.textContent || 'This field'} is required`;
    field.parentNode?.appendChild(msg);
    return false;
  }
  
  if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    field.classList.add('input--error');
    const msg = document.createElement('span');
    msg.className = 'error-message';
    msg.textContent = 'Please enter a valid email address';
    field.parentNode?.appendChild(msg);
    return false;
  }
  
  return true;
}