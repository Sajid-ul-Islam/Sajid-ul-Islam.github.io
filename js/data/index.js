/**
 * CONSOLIDATED DATA MODULE - Single Source of Truth
 * Replaces: data.js, portfolio-data.js, tactical-data.js
 * All portfolio data unified here with proper exports
 */

// ===== PROFILE INFO =====
export const PROFILE_INFO = {
  name: 'Sajid Islam',
  role: 'Forward Deployed Engineer (FDE)',
  title: 'Forward Deployed Engineer (FDE) | AI & Mission Systems Architect',
  heroText: 'Forward Deployed Engineer bridging autonomous AI systems, distributed telemetry, and operational missions. Deploying production multi-agent workflows (LangGraph), resilient data pipelines, and hardened edge systems directly to the operational front line.',
  photo: 'img/profile.jpg',
  email: 'sajid.islam.chowdhury@gmail.com',
  whatsapp: '+880 182 452 6054',
  telegram: 'https://t.me/+8801824526054',
  github: 'https://github.com/Sajid-ul-Islam',
  linkedin: 'https://www.linkedin.com/in/sajidislamchowdhury/',
  huggingface: 'https://huggingface.co/Sajid-ul-Islam',
  kaggle: 'https://www.kaggle.com/saajiidi'
};

// ===== EDUCATION =====
export const EDUCATION = [
  {
    id: 'edu-1',
    institution: 'Academy of Business Professionals',
    degree: 'PGD - Data Science & Business Analytics',
    date: '2025',
    location: 'Dhaka, BD'
  },
  {
    id: 'edu-2',
    institution: 'North South University',
    degree: 'BSc - Computer Science & Engineering',
    date: '2019',
    location: 'Dhaka, BD'
  },
  {
    id: 'edu-3',
    institution: 'BAF Shaheen College Dhaka',
    degree: 'Higher Secondary Certificate (HSC) (Science)',
    date: '2013',
    location: 'Science Division'
  },
  {
    id: 'edu-4',
    institution: 'Uttara High School & College',
    degree: 'Secondary School Certificate (SSC) (Science)',
    date: '2011',
    location: 'Science Division'
  }
];

// ===== EXPERIENCES =====
export const EXPERIENCES = [
  {
    id: 'deencommerce',
    title: 'Forward Deployed Engineer / Lead DataOps',
    company: 'Deen Commerce',
    location: 'Mirpur, Dhaka',
    startDate: 'June 2025',
    current: true,
    description: 'Leading operational systems deployment and CRM retention automation through real-time telemetry. Architected automated data pipelines and mission dashboards reducing reporting overhead by 40%.',
    highlights: [
      'Architected automated real-time performance telemetry across sales and retention, reducing operational overhead by 40%',
      'Engineered event-driven CRM workflows and customer re-engagement funnels, driving a 15% uplift in repeat purchases',
      'Formulated multi-channel inventory and retail telemetry models powering mission-critical promotional strategies'
    ],
    technologies: ['Forward Deployment', 'DataOps', 'Python', 'SQL', 'CRM Automation', 'Power BI']
  },
  {
    id: 'gearmaster',
    title: 'Co-Founder & Technical Operations Lead',
    company: 'Gear Master',
    location: 'Dhaka, BD',
    startDate: 'Jun 2024',
    current: true,
    description: 'Architected retail data architecture, real-time inventory synchronization, and multi-channel commerce pipelines for high-velocity operations.',
    highlights: [
      'Engineered automated multi-channel commerce sync pipelines and real-time inventory tracking',
      'Deployed operational analytics dashboards optimizing inventory turnover and supply-chain efficiency'
    ],
    technologies: ['Systems Architecture', 'Operations', 'Data Pipelines', 'Automation']
  },
  {
    id: 'nztex',
    title: 'Systems & R&D Integration Engineer',
    company: 'NZ TEX GROUP',
    location: 'Rupganj, Narayanganj',
    startDate: 'Feb 2024',
    endDate: 'May 2024',
    description: 'Collaborated with R&D teams to deploy operational tracking tools, production telemetry, and executive intelligence systems.',
    highlights: [
      'Deployed operational telemetry pipelines for manufacturing R&D workflows',
      'Architected executive intelligence reports and automated data pipelines bridging technical metrics with leadership'
    ],
    technologies: ['Systems Integration', 'R&D Telemetry', 'Python', 'Automation']
  },
  {
    id: 'thrivingskills',
    title: 'Solutions & Data Systems Specialist',
    company: 'Thriving Skills',
    location: 'Gulshan, Dhaka',
    startDate: 'Oct 2023',
    endDate: 'Jan 2024',
    description: 'Deployed marketplace telemetry and client retention tracking pipelines, increasing client engagement through data-driven operational intelligence.',
    highlights: [
      'Conducted marketplace performance telemetry, deploying automated funnel tracking tools that accelerated partner growth',
      'Designed and deployed automated CRM re-engagement funnels, significantly increasing customer loyalty and retention',
      'Integrated multi-source customer data pipelines for operational analytics'
    ],
    technologies: ['Marketplace Telemetry', 'CRM Automation', 'Data Systems']
  },
  {
    id: 'daraz',
    title: 'Forward Operations & Marketplace Solutions Specialist',
    company: 'Daraz Bangladesh Ltd. (Alibaba Group)',
    location: 'Banani, Dhaka',
    startDate: 'Jan 2020',
    endDate: 'Jan 2022',
    description: 'Drove partner acquisitions by 50% through automated outreach infrastructure and merchant health telemetry. Managed key accounts with a 20% increase in partner retention.',
    highlights: [
      'Drove a 50% increase in partner acquisitions by deploying targeted outreach infrastructure and vendor performance monitoring',
      'Architected merchant health telemetry dashboards, increasing partner satisfaction by 20% and driving GMV expansion',
      'Optimized regional marketplace logistics through automated operational metrics'
    ],
    technologies: ['Operations Engineering', 'Vendor Telemetry', 'BI Systems', 'SQL']
  },
  {
    id: 'hungrynaki',
    title: 'Operations & Analytics Specialist',
    company: 'HungryNaki (Sister concern of Daraz)',
    location: 'Banani, Dhaka',
    startDate: 'Jul 2021',
    endDate: 'Jan 2022',
    description: 'Built hyper-local food trends telemetry and regional analytics tools, unlocking 15% growth opportunities across merchant networks.',
    highlights: [
      'Deployed BI telemetry tools to uncover hyper-local market opportunities, identifying 15% revenue expansion vectors',
      'Spearheaded partner network acquisition pipelines, expanding operational merchant coverage by 25%',
      'Automated regional performance tracking and operational reporting'
    ],
    technologies: ['BI Telemetry', 'Operations Analytics', 'Growth Pipelines']
  }
];

// ===== PROJECTS =====
export const PROJECTS = [
  {
    id: 'langgraph-demo',
    title: 'LangGraph — Stateful Multi-Agent Autonomous System',
    description: 'Production-grade stateful multi-agent AI workflow powered by LangGraph StateGraph — Researcher → Writer → Reviewer loop with conditional revision edges, shared state reducers, and real LLM deployment.',
    image: '/img/projects/streamlit-hub.png',
    liveUrl: 'https://github.com/Sajid-ul-Islam/langgraph-demo',
    githubUrl: 'https://github.com/Sajid-ul-Islam/langgraph-demo',
    featured: true,
    technologies: ['Python', 'LangGraph', 'LangChain', 'StateGraph', 'Multi-Agent', 'OpenAI'],
    category: 'ai',
    caseStudy: {
      role: 'Lead AI Systems Engineer & Architect',
      timeline: '2026',
      problem: 'Mission operations required a resilient, loop-aware multi-agent architecture capable of research, drafting, and iterative verification with fault tolerance — beyond simple chains.',
      solution: 'Built an enterprise-grade StateGraph with TypedDict state, multi-node feedback loops, conditional review approval gates, and add_messages reducers with live LLM execution.',
      impact: [
        'Autonomous multi-agent execution with conditional loopback and state preservation.',
        'Production-ready architecture toggling between mock runs and live ChatOpenAI instances.'
      ],
      metrics: [
        { label: 'Architecture', value: 'StateGraph (3 nodes + loop)' },
        { label: 'Tech Stack', value: 'Python / LangGraph / LangChain' }
      ]
    }
  },
  {
    id: 'desco-bot',
    title: 'DESCO Utility Telemetry & Assistant Bot',
    description: 'An interactive Telegram bot assistant engineered for DESCO electricity subscribers to track, monitor, and query electricity usage, live account telemetry, and billing intel in real time.',
    image: '/img/projects/streamlit-hub.png',
    liveUrl: 'https://t.me/descoTGbot',
    githubUrl: 'https://github.com/Sajid-ul-Islam/descoiunfobot',
    featured: true,
    technologies: ['Python', 'Telegram API', 'Automation', 'Telemetry', 'Chatbot'],
    category: 'automation',
    caseStudy: {
      role: 'Forward Deployed Integrator & Architect',
      timeline: '2025',
      problem: 'Utility subscribers required a low-latency, automated interface to inspect real-time electricity consumption and account metrics.',
      solution: 'Engineered an interactive Telegram chatbot (@descoTGbot) providing automated electricity usage queries, billing telemetry, and account diagnostics.',
      impact: [
        'Automated real-time query handling for DESCO electricity account metrics.',
        'Eliminated user friction with instant messaging-based utility telemetry.'
      ],
      metrics: [
        { label: 'Bot Handle', value: '@descoTGbot' },
        { label: 'Tech Stack', value: 'Python / Telegram API' }
      ]
    }
  },
  {
    id: 'deen-commerce-bot',
    title: 'DEEN Commerce Production Event Telegram Bot',
    description: 'An automated WooCommerce Telegram webhook integration engineered for real-time e-commerce order notifications, store management alerts, and operational event streams.',
    image: '/img/projects/streamlit-hub.png',
    liveUrl: 'https://github.com/Sajid-ul-Islam/woocom_telegram_bot',
    githubUrl: 'https://github.com/Sajid-ul-Islam/woocom_telegram_bot',
    featured: true,
    technologies: ['Python', 'Telegram API', 'WooCommerce', 'Webhooks', 'Event Streams', 'Automation'],
    category: 'automation',
    caseStudy: {
      role: 'Systems Integration Engineer',
      timeline: '2025',
      problem: 'Operations squads needed instantaneous notifications and mission alerts for store management events inside frontline comms channels.',
      solution: 'Created an event-driven WooCommerce Telegram webhook microservice bridging e-commerce purchase streams with instant operational alerts.',
      impact: [
        'Streamlined store order tracking and mission-critical operational alerts.',
        'Drastically reduced operational incident response times for store managers.'
      ],
      metrics: [
        { label: 'Integration', value: 'WooCommerce Webhook' },
        { label: 'Tech Stack', value: 'Python / Telegram API' }
      ]
    }
  },
  {
    id: 'streamlit-hub',
    title: 'Forward-Deployed Operational App Hub (Streamlit)',
    description: 'A centralized deployment launcher and operational console for 10+ data-ops utilities, inventory monitors, and automation microservices.',
    image: '/img/projects/streamlit-hub.png',
    liveUrl: 'https://share.streamlit.io/user/saajiidi',
    featured: true,
    technologies: ['Python', 'Streamlit', 'Data Ops', 'Telemetry', 'Automation'],
    category: 'automation',
    caseStudy: {
      role: 'Solutions Architect & Field Builder',
      timeline: '2024 - 2025',
      problem: 'Operational tools and client trackers were fragmented across disparate scripts, creating high access latency for operators.',
      solution: 'Developed a centralized Streamlit App Hub to catalog, monitor, and launch 10+ data-ops microservices from a single mission console.',
      impact: [
        'Reduced operator tool access latency by 50%.',
        'Standardized operational data access patterns for frontline business intelligence.'
      ],
      metrics: [
        { label: 'Apps Hosted', value: '10+ Operational Apps' },
        { label: 'Tech Stack', value: 'Python / Streamlit' }
      ]
    }
  },
  {
    id: 'huggingface-space',
    title: 'EconVision — Global Macroeconomic Intelligence Platform',
    description: 'An interactive Hugging Face Space tracking multi-country macroeconomic indicators, trend telemetry, and visual correlation analytics.',
    image: '/img/projects/gdp-debt.png',
    liveUrl: 'https://huggingface.co/spaces/Sajid-ul-Islam/Global-Economical-Analytics',
    featured: true,
    technologies: ['Python', 'Hugging Face', 'Spaces', 'Streamlit', 'Data Visualization', 'Telemetry'],
    category: 'bi-viz',
    caseStudy: {
      role: 'Data Systems Engineer',
      timeline: '2024',
      problem: 'Comparing complex macroeconomic index datasets across countries required specialized visual analytics tooling.',
      solution: 'Built and hosted an interactive economic analytics Space on Hugging Face using Streamlit to visualize multi-dimensional index correlations.',
      impact: [
        'Visualized global macroeconomic indicator correlations and debt-to-GDP metrics.',
        'Engineered an intuitive interface for economic pattern discovery.'
      ],
      metrics: [
        { label: 'Hosting', value: 'Hugging Face Spaces' },
        { label: 'Domain', value: 'Macro-Economic Telemetry' }
      ]
    }
  }
];

// ===== SKILL GROUPS =====
export const SKILL_GROUPS = [
  {
    name: 'Forward Deployment & Infrastructure',
    skills: [
      { name: 'Linux (Hardened/CLI)', category: 'OS', icon: 'fab fa-linux', level: 90 },
      { name: 'Docker', category: 'DevOps', icon: 'fab fa-docker', level: 84 },
      { name: 'CI/CD & Git', category: 'DevOps', icon: 'fab fa-git-alt', level: 88 },
      { name: 'Edge Deployment', category: 'Infra', icon: 'fas fa-server', level: 82 },
      { name: 'API Engineering', category: 'Backend', icon: 'fas fa-network-wired', level: 86 },
      { name: 'System Telemetry', category: 'Monitoring', icon: 'fas fa-tachometer-alt', level: 88 }
    ]
  },
  {
    name: 'Autonomous AI & Agentic Systems',
    skills: [
      { name: 'LangGraph (StateGraph)', category: 'AI', icon: 'fas fa-project-diagram', level: 90 },
      { name: 'LangChain', category: 'AI', icon: 'fas fa-link', level: 86 },
      { name: 'Multi-Agent Loops', category: 'AI', icon: 'fas fa-robot', level: 85 },
      { name: 'LLMOps & RAG', category: 'AI', icon: 'fas fa-brain', level: 84 },
      { name: 'Prompt Architecture', category: 'AI', icon: 'fas fa-terminal', level: 88 },
      { name: 'Scikit-learn', category: 'ML', icon: 'fas fa-microchip', level: 80 }
    ]
  },
  {
    name: 'Distributed Data & Telemetry',
    skills: [
      { name: 'Python', category: 'Language', icon: 'fab fa-python', level: 92 },
      { name: 'SQL (PostgreSQL/MySQL)', category: 'DB', icon: 'fas fa-database', level: 90 },
      { name: 'Pandas & NumPy', category: 'Data', icon: 'fas fa-table', level: 90 },
      { name: 'Data Pipelines (ETL)', category: 'Data', icon: 'fas fa-stream', level: 86 },
      { name: 'Plotly & Dash', category: 'Visualization', icon: 'fas fa-chart-line', level: 86 },
      { name: 'Power BI', category: 'BI', icon: 'fas fa-chart-pie', level: 85 }
    ]
  },
  {
    name: 'Tactical UI & Terminal Interfaces',
    skills: [
      { name: 'Terminal / HUD UIs', category: 'UI', icon: 'fas fa-terminal', level: 94 },
      { name: 'JavaScript (ES6+)', category: 'Language', icon: 'fab fa-js', level: 86 },
      { name: 'TypeScript', category: 'Language', icon: 'fas fa-code', level: 82 },
      { name: 'HTML5 & CSS3', category: 'Web', icon: 'fab fa-html5', level: 90 },
      { name: 'Vite & Build Tooling', category: 'Build', icon: 'fas fa-bolt', level: 85 },
      { name: 'Flask & FastAPI', category: 'Backend', icon: 'fas fa-fire', level: 84 }
    ]
  }
];

// ===== BLOG POSTS =====
export const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Optimizing Retail BI: A Daraz Case Study',
    date: 'Oct 12, 2024',
    excerpt: 'Deep dive into how we increased partner acquisitions by 50% using automated funnel tracking.',
    tags: ['BI', 'Case Study', 'Growth'],
    url: 'https://www.linkedin.com/pulse/optimizing-retail-bi-daraz-case-study-sajid-islam/'
  },
  {
    id: 'blog-2',
    title: 'Python for Automation: Pinterest Scrapers',
    date: 'Sep 05, 2024',
    excerpt: 'Technical walkthrough of building mass-image downloaders for dataset creation.',
    tags: ['Python', 'Automation', 'NLP'],
    url: 'https://www.linkedin.com/pulse/python-automation-pinterest-scrapers-sajid-islam/'
  },
  {
    id: 'blog-3',
    title: 'Modern Dashboards: Beyond Aesthetics',
    date: 'Aug 20, 2024',
    excerpt: 'Why readability wins over flashy animations when building mission-critical tools.',
    tags: ['Data Viz', 'UI/UX', 'Analytics'],
    url: 'https://www.linkedin.com/pulse/modern-dashboards-beyond-aesthetics-sajid-islam/'
  }
];

// ===== LEARNING ITEMS =====
export const LEARNING_ITEMS = [
  { name: 'LangGraph & Multi-Agent Orchestration', category: 'AI', progress: 88 },
  { name: 'Distributed Systems & Edge Telemetry', category: 'Infra', progress: 82 },
  { name: 'Retrieval-Augmented Generation (RAG)', category: 'AI', progress: 85 },
  { name: 'LLMOps & High-Availability Serving', category: 'DevOps', progress: 78 },
  { name: 'Container Security & Linux Hardening', category: 'Infra', progress: 75 },
  { name: 'Real-Time Event Streams & Webhooks', category: 'Engineering', progress: 80 }
];

// ===== STATS =====
export const STATS = [
  { label: 'Years Experience', value: 4, suffix: '+', accent: false },
  { label: 'Systems Deployed', value: 15, suffix: '+', accent: true },
  { label: 'Tech Publications', value: 3, suffix: '+', accent: false },
  { label: 'Certifications', value: 10, suffix: '+', accent: false }
];

// ===== GAMING DATA =====
export const GAMING = {
  stats: [
    { label: 'HOURS_LOGGED', value: '2400+' },
    { label: 'STRATEGY_MASTERY', value: 'ELITE' },
    { label: 'SERVER_RANK', value: '#12' }
  ],
  favorites: [
    { name: 'Red Dead Redemption 2', category: 'Masterpiece' },
    { name: 'God of War Ragnarok', category: 'Storytelling' },
    { name: 'FC24 / FIFA', category: 'Competitive' },
    { name: 'Ghost of Tsushima', category: 'Visuals' }
  ]
};

// ===== FILE TREE =====
export const FILE_TREE = [
  {
    id: 'explorer',
    label: 'EXPLORER',
    isOpen: true,
    items: [
      { id: 'sajid-ul-islam-site', label: 'Sajid-ul-Islam.github.io', href: 'https://sajid-ul-islam.github.io/', icon: 'globe', extension: 'link' }
    ]
  },
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    isOpen: true,
    items: [
      { id: 'home', label: 'Welcome', href: '/', icon: 'home', extension: 'tsx' },
      { id: 'experience', label: 'Experience', href: '#experience', icon: 'briefcase', extension: 'tsx' },
      { id: 'skills', label: 'Skills', href: '#skills', icon: 'code', extension: 'json' },
      { id: 'projects', label: 'Projects', href: '#projects', icon: 'folder', extension: 'tsx' },
      { id: 'education', label: 'Education', href: '#education', icon: 'graduation-cap', extension: 'tsx' },
      { id: 'contact', label: 'Contact', href: '#contact', icon: 'mail', extension: 'tsx' },
    ],
  },
  {
    id: 'hobbies',
    label: 'HOBBIES',
    isOpen: false,
    items: [
      { id: 'favorites', label: 'Favorites', href: '#hobbies', icon: 'star', extension: 'tsx' },
      { id: 'gaming', label: 'Gaming', href: '#hobbies', icon: 'gamepad-2', extension: 'tsx' },
      { id: 'blogs', label: 'Blogs', href: '#blogs', icon: 'book-open', extension: 'md' },
    ],
  },
  {
    id: 'more',
    label: 'MORE',
    isOpen: false,
    items: [
      { id: 'learning', label: 'Learning', href: '#learning', icon: 'graduation-cap', extension: 'tsx' },
      { id: 'startup', label: 'Startup', href: '#projects', icon: 'rocket', extension: 'tsx' },
    ],
  },
];

// ===== SOCIAL LINKS =====
export const SOCIAL_LINKS = [
  { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/sajidislamchowdhury/', icon: 'linkedin', color: '#0077b5' },
  { id: 'github', name: 'GitHub', url: 'https://github.com/Sajid-ul-Islam', icon: 'github', color: '#333333' },
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/+8801824526054?text=', icon: 'message-circle', color: '#25D366' },
  { id: 'telegram', name: 'Telegram', url: 'https://t.me/+8801824526054', icon: 'send', color: '#0088cc' },
  { id: 'resume', name: 'Resume', url: 'https://sajid-ul-islam.github.io/resume.html', icon: 'file-text', color: '#da552f' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/Sajid-ul-Islam', icon: 'robot', color: '#FFD21E' },
];

// ===== AI BOT LOCAL INTEL =====
export const LOCAL_INTEL = {
  profile: `${PROFILE_INFO.name}. ${PROFILE_INFO.role} based in Dhaka. Specializing in autonomous AI agents (LangGraph), real-time operational telemetry, and mission-critical production deployments. Lead DataOps at DEEN Commerce, ex-Daraz (Alibaba Group).`,
  experience: EXPERIENCES.map(exp => `${exp.title} @ ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'}) — ${exp.highlights?.[0] || exp.description}`),
  education: EDUCATION.map(edu => `${edu.degree} @ ${edu.institution} (${edu.date})`),
  skills: SKILL_GROUPS.flatMap(g => g.skills.map(s => s.name)).join(', '),
  projects: PROJECTS.map(p => `${p.title} — ${p.description}`),
  certifications: 'Data Science & Business Analytics (PGD), Multi-Agent AI Architectures, Python Systems & Data Science, SQL & Distributed Data Systems.',
  learning: LEARNING_ITEMS.map(l => `${l.name} — ${l.progress}% progress`),
  contact: {
    email: PROFILE_INFO.email,
    whatsapp: PROFILE_INFO.whatsapp,
    telegram: PROFILE_INFO.telegram,
    github: PROFILE_INFO.github,
    linkedin: PROFILE_INFO.linkedin,
    kaggle: PROFILE_INFO.kaggle,
    huggingface: PROFILE_INFO.huggingface
  },
  availability: 'Available for full-time Forward Deployed Engineer roles, mission deployments, distributed AI contracts, and solutions architecture. Open to global on-site and remote missions.',
  gaming: `Favorite games: ${GAMING.favorites.map(g => g.name).join(', ')}. ${GAMING.stats[0]?.value || '2400+'} hours logged.`
};

// ===== BACKWARD COMPATIBILITY =====
// Maintain the DATA object for legacy code
export const DATA = {
  projects: PROJECTS,
  blogPosts: BLOG_POSTS,
  learningItems: LEARNING_ITEMS,
  gaming: GAMING,
  fileTreeData: FILE_TREE,
  socialLinks: SOCIAL_LINKS,
  skillGroups: SKILL_GROUPS,
  experiences: EXPERIENCES,
  stats: STATS
};

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

// ===== PORTFOLIO DATA PROVIDER =====
export const PortfolioData = {
  _data: null,
  
  async load() {
    if (this._data) return this._data;

    try {
      localStorage.removeItem('portfolio-data-cache');
    } catch {
      // Storage can be unavailable in restricted browser modes.
    }
    
    this._data = {
      info: { ...PROFILE_INFO },
      education: cloneData(EDUCATION),
      experiences: cloneData(EXPERIENCES),
      projects: cloneData(PROJECTS),
      skills: cloneData(SKILL_GROUPS),
      blogs: cloneData(BLOG_POSTS),
      learning: cloneData(LEARNING_ITEMS),
      gaming: cloneData(GAMING),
      fileTree: cloneData(FILE_TREE)
    };
    
    return this._data;
  },
  
  getInfo() { return this._data?.info || PROFILE_INFO; },
  getExperiences() { return this._data?.experiences || EXPERIENCES; },
  getEducation() { return this._data?.education || EDUCATION; },
  getSkills() { return this._data?.skills || SKILL_GROUPS; },
  getProjects() { return this._data?.projects || PROJECTS; },
  getBlogPosts() { return this._data?.blogs || BLOG_POSTS; },
  getLearning() { return this._data?.learning || LEARNING_ITEMS; },
  getGaming() { return this._data?.gaming || GAMING; },
  getFileTree() { return this._data?.fileTree || FILE_TREE; }
};

if (typeof window !== 'undefined') {
  window.PortfolioData = PortfolioData;
}

