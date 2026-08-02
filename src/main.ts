import './styles/global.css';
import './styles/components.css';

import { createApp } from './app';
import { initScrollController } from './controllers/scrollController';
import { initLenis } from './utils/lenis';
import { registerComponents } from './components';
import { initTheme } from './utils/theme';

async function bootstrap() {
  initTheme();
  await registerComponents();
  
  const lenis = initLenis();
  const scrollController = initScrollController(lenis);
  
  const app = createApp({
    lenis,
    scrollController,
  });
  
  
  if (import.meta.env.DEV) {
    console.log('[Bootstrap] App initialized');
    console.log('[Bootstrap] Scroll controller ready');
    console.log('[Bootstrap] Lenis smooth scroll ready');
  }
}

bootstrap().catch(console.error);