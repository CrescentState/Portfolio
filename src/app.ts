import type { AppContext } from './types';

interface RouteComponent {
  mount: (container: HTMLElement, context: AppContext) => void;
  unmount: () => void;
}

const routeRegistry = new Map<string, RouteComponent>();

export function registerRoute(path: string, component: RouteComponent) {
  routeRegistry.set(path, component);
}

export function getRoute(path: string): RouteComponent | undefined {
  return routeRegistry.get(path);
}

export function createApp(context: AppContext) {
  const appContainer = document.getElementById('app');
  if (!appContainer) throw new Error('App container not found');

  const container: HTMLElement = appContainer;

  let currentRoute: RouteComponent | null = null;
  let currentPath = '';

  function matchRoute(path: string): { component: RouteComponent; params: Record<string, string> } | null {
    const routes = Array.from(routeRegistry.entries());
    
    for (const [routePath, component] of routes) {
      const params: Record<string, string> = {};
      const regex = routePathToRegex(routePath, params);
      
      if (regex.test(path)) {
        const match = path.match(regex);
        if (match) {
          const paramNames = routePath.match(/:(\w+)/g) || [];
          paramNames.forEach((param, i) => {
            params[param.slice(1)] = match[i + 1];
          });
        }
        return { component, params };
      }
    }
    return null;
  }

  function routePathToRegex(path: string, params: Record<string, string>): RegExp {
    const regexPath = path
      .replace(/:(\w+)/g, '([^/]+)')
      .replace(/\//g, '\\/');
    return new RegExp(`^${regexPath}$`);
  }

  function navigate(path: string, replace = false) {
    if (replace) {
      history.replaceState(null, '', path);
    } else {
      history.pushState(null, '', path);
    }
    handleRouteChange(path);
  }

  function handleRouteChange(path: string) {
    const matched = matchRoute(path);
    
    if (currentRoute) {
      currentRoute.unmount();
      currentRoute = null;
    }

    if (matched) {
      currentRoute = matched.component;
      currentRoute.mount(container, context);
      currentPath = path;
    } else {
      const notFound = routeRegistry.get('/404');
      if (notFound) {
        currentRoute = notFound;
        currentRoute.mount(container, context);
      }
      currentPath = '/404';
    }

    window.scrollTo(0, 0);
    document.title = getPageTitle(currentPath);
  }

  function getPageTitle(path: string): string {
    const titles: Record<string, string> = {
      '/': 'Alen | Creative Developer',
      '/work': 'Work | Alen',
      '/about': 'About | Alen',
      '/contact': 'Contact | Alen',
      '/404': 'Not Found | Alen',
    };
    
    for (const [route, title] of Object.entries(titles)) {
      if (path.startsWith(route.replace(':slug', ''))) {
        return title;
      }
    }
    return 'Alen | Creative Developer';
  }

  window.addEventListener('popstate', () => {
    handleRouteChange(window.location.pathname);
  });

  document.addEventListener('click', (e) => {
    const link = e.target instanceof HTMLElement ? e.target.closest('a[href^="/"]') : null;
    if (link && link instanceof HTMLAnchorElement) {
      e.preventDefault();
      navigate(link.getAttribute('href') || '/');
    }
  });

  handleRouteChange(window.location.pathname);

  return {
    mount: () => {},
    unmount: () => {
      if (currentRoute) {
        currentRoute.unmount();
      }
    },
    navigate,
    getCurrentPath: () => currentPath,
  };
}

export function registerComponents(): Promise<void> {
  return Promise.all([
    import('./pages/HomePage').then(m => registerRoute('/', m.default)),
    import('./pages/WorkPage').then(m => registerRoute('/work', m.default)),
    import('./pages/ProjectPage').then(m => registerRoute('/work/:slug', m.default)),
    import('./pages/AboutPage').then(m => registerRoute('/about', m.default)),
    import('./pages/ContactPage').then(m => registerRoute('/contact', m.default)),
    import('./pages/NotFoundPage').then(m => registerRoute('/404', m.default)),
  ]).then(() => {});
}