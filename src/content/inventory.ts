export const siteContent = {
  meta: {
    title: 'Alen John | Python Backend Engineer',
    description: 'Python Backend Engineer building async data pipelines and schema-normalized systems. BTech AI & Data Science, graduating 2027.',
    ogImage: '/og-default.jpg',
    themeColor: '#0a0a0f',
  },
  navigation: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  hero: {
    headline: 'Python Backend Engineer',
    subheadline: 'Building Async Data Pipelines',
    description: 'I build production APIs with strict Pydantic schemas, async data pipelines, and schema-normalized systems. Currently exploring document processing and property intelligence data normalization.',
    cta: { label: 'View Work', href: '/work' },
  },
  work: {
    title: 'Selected Work',
    projects: [
      {
        id: 'knowledge-base-api',
        title: 'Knowledge Base API',
        category: 'Backend / Data Pipeline',
        description: 'FastAPI service for async PDF processing with Pydantic schemas and Docker deployment. Swapping Docling → PyMuPDF for production stability.',
        image: '/projects/knowledge-base-api.jpg',
        tags: ['FastAPI', 'Pydantic', 'Asyncio', 'Docker', 'PyMuPDF'],
        link: 'https://github.com/CrescentState/knowledge-base-api',
        featured: true,
      },
      {
        id: 'property-intelligence',
        title: 'Property Intelligence Normalizer',
        category: 'Data Engineering',
        description: 'Schema normalization for property intelligence data — mapping messy multi-source data into clean, validated canonical models.',
        image: '/projects/property-intelligence.jpg',
        tags: ['Python', 'Pydantic', 'PostgreSQL', 'Data Normalization'],
        link: '#',
        featured: true,
      },
      {
        id: 'scraping-stack',
        title: 'Web Data Extraction Stack',
        category: 'Data Extraction',
        description: 'Playwright for dynamic JS, BeautifulSoup for static HTML. Production-grade scraping with proper error handling and rate limiting.',
        image: '/projects/scraping-stack.jpg',
        tags: ['Playwright', 'BeautifulSoup', 'Asyncio', 'MongoDB'],
        link: '#',
        featured: false,
      },
      {
        id: 'async-job-queue',
        title: 'Async Job Queue System',
        category: 'Backend Infrastructure',
        description: 'Distributed async job queue for document processing pipelines with provenance tracking and schema validation.',
        image: '/projects/async-job-queue.jpg',
        tags: ['Python', 'Asyncio', 'Redis', 'Pydantic'],
        link: '#',
        featured: false,
      },
    ],
  },
  about: {
    title: 'About Me',
    bio: [
      "I'm Alen John — a Python Backend Engineer focused on async data pipelines, schema-normalized systems, and document processing. Currently pursuing BTech in AI & Data Science, graduating 2027.",
      'My work centers on building production-grade APIs with FastAPI and strict Pydantic schemas, web data extraction using Playwright and BeautifulSoup, and document processing pipelines with provenance tracking.',
      "I'm a member of the 100xDevs cohort, building in public and shipping fast. I care more about data correctness than framework hype.",
    ],
    skills: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Pydantic', 'Asyncio', 'Node.js', 'Express'] },
      { category: 'Data', items: ['Playwright', 'BeautifulSoup', 'MongoDB', 'PostgreSQL', 'Redis'] },
      { category: 'Frontend', items: ['React 18', 'TypeScript', 'Tailwind CSS'] },
      { category: 'DevOps', items: ['Docker', 'Git', 'uv', 'Ruff', 'pytest'] },
    ],
    stats: [
      { value: '2027', label: 'Graduation Year' },
      { value: '100xDevs', label: 'Cohort Member' },
      { value: '4+', label: 'Core Tech Areas' },
      { value: '∞', label: 'Data Quality Focus' },
    ],
  },
  contact: {
    title: 'Get In Touch',
    description: 'Looking for junior backend / data engineering roles where I can own data pipelines, schema design, and data quality. Remote-first.',
    form: {
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'project', label: 'Project Type', type: 'select', options: ['Backend API', 'Data Pipeline', 'Web Scraping', 'Document Processing', 'Other'] },
        { name: 'budget', label: 'Budget Range', type: 'select', options: ['<$5k', '$5k-$15k', '$15k-$30k', '$30k+', 'Not Sure'] },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
      ],
      submitLabel: 'Send Message',
    },
    social: [
      { platform: 'GitHub', url: 'https://github.com/CrescentState', icon: 'github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/alenjohn-d', icon: 'linkedin' },
      { platform: 'Wellfound', url: 'https://wellfound.com', icon: 'briefcase' },
      { platform: 'Email', url: 'mailto:alenjohn@example.com', icon: 'mail' },
    ],
  },
  footer: {
    copyright: '© 2024 Alen John. Built with care.',
    credits: 'Designed & Developed by Alen John',
  },
};


export const routes = [
  { path: '/', title: 'Home', description: 'Python Backend Engineer building async data pipelines.' },
  { path: '/work', title: 'Work', description: 'Selected projects and case studies.' },
  { path: '/work/:slug', title: 'Project', description: 'Project case study.' },
  { path: '/about', title: 'About', description: 'Learn more about me and my approach.' },
  { path: '/contact', title: 'Contact', description: 'Get in touch for collaborations.' },
  { path: '/404', title: 'Not Found', description: 'Page not found.' },
];

export const breakpoints = {
  xs: '320px',
  sm: '375px',
  md: '414px',
  lg: '768px',
  xl: '1024px',
  xxl: '1440px',
  xxxl: '1920px',
  '4k': '2560px',
};

export const colors = {
  primary: '#0a0a0f',
  secondary: '#1a1a2e',
  accent: '#00d4aa',
  accentHover: '#00e8bb',
  text: '#f0f0f5',
  textMuted: '#8888a0',
  border: '#2a2a3e',
  background: '#050508',
  surface: '#0f0f1a',
  error: '#ff4757',
  success: '#2ed573',
};

export const spacing = {
  base: '8px',
  scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128].map(v => `${v}px`),
};

export const typography = {
  fontFamilies: {
    display: '"Space Grotesk", "Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
    '6xl': '5rem',
  },
  lineHeights: {
    tight: '1.1',
    normal: '1.5',
    relaxed: '1.75',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
};

export const zIndices = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  loader: 1000,
};
