/**
 * CONSOLIDATED DATA MODULE - Single Source of Truth
 * Replaces: data.js, portfolio-data.js, tactical-data.js
 * All portfolio data unified here with proper exports
 */

// ===== PROFILE INFO =====
export const PROFILE_INFO = {
  name: 'Sajid Islam',
  role: 'Data Scientist & Business Analyst',
  heroText: 'A Data & Business Analyst specialized in turning complex datasets into strategic growth. Based in Bangladesh, I lead data-ops at DEEN Commerce and previously optimized performance at Daraz (Alibaba Group).',
  photo: 'img/profile.jpg',
  email: 'sajid.islam.chowdhury@gmail.com',
  whatsapp: '+880 182 452 6054',
  github: 'https://github.com/saajiidi',
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
    title: 'Business Analyst',
    company: 'Deen Commerce',
    location: 'Mirpur, Dhaka',
    startDate: 'June 2025',
    current: true,
    description: 'Leading Business Strategy and CRM growth through granular performance tracking. Architecting weekly performance dashboards.',
    highlights: [
      'CRM Improvisation',
      'Business Strategy',
      'Architecting weekly performance dashboards for stakeholder reporting'
    ],
    technologies: ['CRM', 'Business Analysis', 'Strategy']
  },
  {
    id: 'gearmaster',
    title: 'Co-Founder',
    company: 'Gear Master',
    location: 'Dhaka, BD',
    startDate: 'Jun 2024',
    current: true,
    description: 'Leading Business Operations for bike accessories retail. Managing inventory and multi-channel engagement.',
    highlights: [
      'Leading Business Operations for a bike accessories retail startup',
      'Managing inventory, sales growth strategies, and multi-channel customer engagement'
    ],
    technologies: ['Retail', 'Business Management']
  },
  {
    id: 'nztex',
    title: 'IT Executive',
    company: 'NZ TEX GROUP',
    location: 'Rupganj, Narayanganj',
    startDate: 'Feb 2024',
    endDate: 'May 2024',
    description: 'Collaborated with the Research & Development Team to enhance product innovation. Delivered impactful presentations and reports to authorities and buyers.',
    highlights: [
      'Collaborated with the Research & Development Team to enhance product innovation',
      'Delivered impactful presentations and reports to authorities and buyers, enhancing stakeholder engagement'
    ],
    technologies: ['IT Support', 'R&D', 'Reporting']
  },
  {
    id: 'thrivingskills',
    title: 'Associate – Online Sales & Customer Supports',
    company: 'Thriving Skills',
    location: 'Gulshan, Dhaka',
    startDate: 'Oct 2023',
    endDate: 'Jan 2024',
    description: 'Conducted business and marketplace analysis; executed targeted sales strategies to increase customer loyalty and engagement.',
    highlights: [
      'Conducted comprehensive business and marketplace analysis, identifying opportunities that increased sales',
      'Designed and executed targeted sales strategies, resulting in a significant increase in customer loyalty and engagement',
      'Managed CRM systems to improve customer retention'
    ],
    technologies: ['Market Analysis', 'CRM', 'Sales Strategy']
  },
  {
    id: 'daraz',
    title: 'Jr. Executive – Marketplace',
    company: 'Daraz Bangladesh Ltd.',
    location: 'Banani, Dhaka',
    startDate: 'Jan 2020',
    endDate: 'Jan 2022',
    description: 'Increased partner acquisitions by 50% through targeted outreach strategies. Managed key accounts and increased client satisfaction by 20%.',
    highlights: [
      'Drove a 50% increase in partner acquisitions by implementing targeted outreach strategies and enhancing brand visibility',
      'Led successful campaigns and managed key accounts, increasing client satisfaction by 20% and driving revenue growth',
      'Optimized Marketplace Health through vendor performance tracking'
    ],
    technologies: ['Marketplace', 'Acquisition', 'Account Management']
  },
  {
    id: 'hungrynaki',
    title: 'Associate – Home Kitchen & Street Food',
    company: 'HungryNaki (Sister concern of Daraz)',
    location: 'Banani, Dhaka',
    startDate: 'Jul 2021',
    endDate: 'Jan 2022',
    description: 'Identified 15% growth opportunities through in-depth marketplace analysis. Spearheaded partner acquisition initiatives, increasing the network by 25%.',
    highlights: [
      'Conducted in-depth business and marketplace analysis, identifying 15% growth opportunities that increased revenue',
      'Spearheaded brand and partner acquisition initiatives, increasing partner network by 25%',
      'Leveraged BI tools to identify hyper-local food trends'
    ],
    technologies: ['Business Analysis', 'Growth Strategy', 'BI Tools']
  }
];

// ===== PROJECTS =====
export const PROJECTS = [
  {
    id: 'streamlit-hub',
    title: 'Streamlit Prototype Projects',
    description: 'A centralized prototype command center for 10+ operational data apps, including inventory trackers, sales dashboards, and automation tools.',
    image: '/img/projects/streamlit-hub.png',
    liveUrl: 'https://share.streamlit.io/user/saajiidi',
    featured: true,
    technologies: ['Python', 'Streamlit', 'Automation', 'Data Ops'],
    category: 'automation',
    caseStudy: {
      role: 'Solutions Architect & Builder',
      timeline: '2024 - 2025',
      problem: 'Operational tools and client trackers were scattered, causing high latency in access.',
      solution: 'Developed a centralized Streamlit App Hub to catalog and launch 10+ data-ops utilities from a single interface.',
      impact: [
        'Reduced application access latency by 50%.',
        'Standardized data access patterns for operational business analytics.'
      ],
      metrics: [
        { label: 'Apps Hosted', value: '10+' },
        { label: 'Tech Stack', value: 'Python / Streamlit' }
      ]
    }
  },
  {
    id: 'huggingface-space',
    title: 'Hugging Face Space (EconVision)',
    description: 'An interactive Hugging Face Space focused on global economic analytics, visual comparisons, and macro-trend index insights.',
    image: '/img/projects/gdp-debt.png',
    liveUrl: 'https://huggingface.co/spaces/Sajid-ul-Islam/Global-Economical-Analytics',
    featured: true,
    technologies: ['Python', 'Hugging Face', 'Spaces', 'Streamlit', 'Data Visualization'],
    category: 'bi-viz',
    caseStudy: {
      role: 'Data Scientist & Builder',
      timeline: '2024',
      problem: 'Comparing multiple macroeconomic index data series across countries required complex visual tooling.',
      solution: 'Built and hosted a specialized economic analytics Space on Hugging Face using Streamlit/Gradio.',
      impact: [
        'Visualized global macroeconomic indicator correlations.',
        'Created a clean interface for index pattern discovery.'
      ],
      metrics: [
        { label: 'Hosting', value: 'Hugging Face' },
        { label: 'Domain', value: 'Macro-Economics' }
      ]
    }
  }
];

// ===== SKILL GROUPS =====
export const SKILL_GROUPS = [
  {
    name: 'BI & Product Strategy',
    skills: [
      { name: 'Business Intelligence', category: 'BI', icon: 'https://img.icons8.com/color/48/000000/business-report.png', level: 92 },
      { name: 'Data Visualization', category: 'BI', icon: 'https://img.icons8.com/color/48/000000/combo-chart.png', level: 92 },
      { name: 'Product Management', category: 'Strategy', icon: 'https://img.icons8.com/color/48/000000/product--v1.png', level: 85 },
      { name: 'Market Research', category: 'Strategy', icon: 'https://img.icons8.com/color/48/000000/search--v1.png', level: 90 }
    ]
  },
  {
    name: 'Data Science & AI Engineering',
    skills: [
      { name: 'Data Analytics & ML', category: 'Data', icon: 'https://img.icons8.com/color/48/null/python--v1.png', level: 85 },
      { name: 'Agentic AI Systems', category: 'AI', icon: 'https://img.icons8.com/color/48/000000/robot-intellectual.png', level: 82 },
      { name: 'RAG (Retrieval-Augmented Generation)', category: 'AI', icon: 'https://img.icons8.com/color/48/000000/artificial-intelligence.png', level: 85 },
      { name: 'Machine Learning Engineering', category: 'AI', icon: 'https://img.icons8.com/color/48/000000/neural-network.png', level: 85 },
      { name: 'Python & SQL', category: 'Data', icon: 'https://img.icons8.com/color/48/000000/python.png', level: 85 }
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
  { name: 'Agentic Workflows (LangGraph/CrewAI)', category: 'AI', progress: 82 },
  { name: 'Advanced RAG & Vector DBs', category: 'AI', progress: 85 },
  { name: 'LLM Fine-Tuning (LoRA/QLoRA)', category: 'ML', progress: 65 },
  { name: 'Modern Data Stack (dbt & Snowflake)', category: 'Data Ops', progress: 70 },
  { name: 'Real-Time Streaming Analytics', category: 'BI', progress: 60 },
  { name: 'MLOps & Model Deployment', category: 'ML', progress: 75 }
];

// ===== STATS =====
export const STATS = [
  { label: 'Years Experience', value: 4, suffix: '+', accent: false },
  { label: 'Projects Completed', value: 15, suffix: '+', accent: true },
  { label: 'Publications', value: 3, suffix: '+', accent: false },
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
      { id: 'family', label: 'Family', href: '#family', icon: 'users', extension: 'tsx' },
      { id: 'contact', label: 'Contact', href: '#contact', icon: 'mail', extension: 'tsx' },
    ],
  },
  {
    id: 'hobbies',
    label: 'HOBBIES',
    isOpen: false,
    items: [
      { id: 'favorites', label: 'Favorites', href: '/Favorites', icon: 'star', extension: 'tsx' },
      { id: 'gaming', label: 'Gaming', href: '/Gaming', icon: 'gamepad-2', extension: 'tsx' },
      { id: 'blogs', label: 'Blogs', href: '/Blogs', icon: 'book-open', extension: 'md' },
    ],
  },
  {
    id: 'more',
    label: 'MORE',
    isOpen: false,
    items: [
      { id: 'learning', label: 'Learning', href: '/Learning', icon: 'graduation-cap', extension: 'tsx' },
      { id: 'startup', label: 'Startup', href: '/Startup', icon: 'rocket', extension: 'tsx' },
    ],
  },
];

// ===== SOCIAL LINKS =====
export const SOCIAL_LINKS = [
  { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/sajidislamchowdhury/', icon: 'linkedin', color: '#0077b5' },
  { id: 'github', name: 'GitHub', url: 'https://github.com/Sajid-ul-Islam', icon: 'github', color: '#333333' },
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/+8801824526054?text=', icon: 'message-circle', color: '#25D366' },
  { id: 'resume', name: 'Resume', url: 'https://sajid-ul-islam.github.io/resume.html', icon: 'file-text', color: '#da552f' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/Sajid-ul-Islam', icon: 'robot', color: '#FFD21E' },
];

// ===== GOOGLE SHEETS CONFIG =====
export const SHEET_CONFIG = {
  SHEET_ID: '1jRHTJ6rC4UMLoBt1o26mfOlOzDTnGJGv',
  get BASE_URL() {
    return `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;
  },
  SHEETS: {
    INFO: 'Info',
    EXPERIENCE: 'Experience',
    EDUCATION: 'Education',
    SKILLS: 'Skills',
    PROJECTS: 'Projects',
    AWARDS: 'Awards'
  }
};

// ===== AI BOT LOCAL INTEL =====
export const LOCAL_INTEL = {
  profile: `${PROFILE_INFO.role  } based in Dhaka. DataOps Lead at DEEN Commerce, ex-Daraz (Alibaba). Expert in strategic growth via BI & ML.`,
  experience: EXPERIENCES.slice(0, 3).map(exp => `${exp.title} @ ${exp.company} (${exp.startDate} - Present)`),
  education: EDUCATION.slice(0, 2).map(edu => `${edu.degree} @ ${edu.institution} (${edu.date})`),
  skills: 'Python, SQL, Power BI, Machine Learning, Data Automation, Strategic Business Analysis.',
  projects: PROJECTS.filter(p => p.featured).slice(0, 4).map(p => p.title).join(', ')
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

// ===== HELPER FUNCTIONS =====
export function parseCSV(csvText) {
  const lines = csvText.split('\n');
  if (lines.length < 1) return [];
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const obj = {};
    headers.forEach((header, i) => {
      let val = values[i] ? values[i].replace(/^"|"$/g, '').trim() : '';
      val = val.replace(/""/g, '"');
      obj[header] = val;
    });
    return obj;
  });
}

export async function fetchSheetData(sheetName) {
  try {
    const response = await fetch(`${SHEET_CONFIG.BASE_URL}${sheetName}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    return [];
  }
}

// ===== PORTFOLIO DATA PROVIDER =====
export const PortfolioData = {
  _data: null,
  
  async load() {
    if (this._data) return this._data;
    
    const cached = localStorage.getItem('portfolio-data-cache');
    if (cached) {
      try {
        this._data = JSON.parse(cached);
        return this._data;
      } catch (e) {
        // Cache corrupted, rebuild
      }
    }
    
    this._data = {
      info: PROFILE_INFO,
      education: EDUCATION,
      experiences: EXPERIENCES,
      projects: PROJECTS,
      skills: SKILL_GROUPS,
      blogs: BLOG_POSTS,
      learning: LEARNING_ITEMS,
      gaming: GAMING,
      fileTree: FILE_TREE
    };
    
    // Try to fetch from Google Sheets
    try {
      const [infoData, expData, eduData, skillData, projData] = await Promise.allSettled([
        fetchSheetData(SHEET_CONFIG.SHEETS.INFO),
        fetchSheetData(SHEET_CONFIG.SHEETS.EXPERIENCE),
        fetchSheetData(SHEET_CONFIG.SHEETS.EDUCATION),
        fetchSheetData(SHEET_CONFIG.SHEETS.SKILLS),
        fetchSheetData(SHEET_CONFIG.SHEETS.PROJECTS)
      ]);
      
      // Merge remote data if available
      if (infoData.status === 'fulfilled' && infoData.value.length > 0) {
        const remoteInfo = infoData.value[0];
        this._data.info = {
          ...PROFILE_INFO,
          name: remoteInfo.Name || PROFILE_INFO.name,
          role: remoteInfo.Role || PROFILE_INFO.role,
          heroText: remoteInfo.HeroText || PROFILE_INFO.heroText,
          email: remoteInfo.Email || PROFILE_INFO.email,
          whatsapp: remoteInfo.Whatsapp || PROFILE_INFO.whatsapp,
          github: remoteInfo.Github || PROFILE_INFO.github,
          linkedin: remoteInfo.LinkedIn || PROFILE_INFO.linkedin
        };
      }
      
      if (expData.status === 'fulfilled' && expData.value.length > 0) {
        this._data.experiences = expData.value.map(item => ({
          id: item.id || item.ID || Math.random().toString(36).substr(2, 9),
          title: item.title || item.Role || item.Position,
          company: item.company || item.Company,
          location: item.location || item.Location,
          startDate: item.startDate || item.Date,
          endDate: item.endDate || '',
          description: item.description || item.Description || '',
          highlights: item.highlights ? (typeof item.highlights === 'string' ? item.highlights.split('|') : item.highlights) : [],
          technologies: item.technologies ? (typeof item.technologies === 'string' ? item.technologies.split(',') : item.technologies) : []
        }));
      }
      
      if (eduData.status === 'fulfilled' && eduData.value.length > 0) {
        this._data.education = eduData.value.map(item => ({
          id: item.id || item.ID || Math.random().toString(36).substr(2, 9),
          institution: item.institution || item.Institution,
          degree: item.degree || item.Degree,
          date: item.date || item.Date,
          location: item.location || item.Location
        }));
      }
    } catch (e) {
      // Google Sheets unavailable, use local data
    }
    
    // Cache the data
    try {
      localStorage.setItem('portfolio-data-cache', JSON.stringify(this._data));
    } catch (e) {
      // Storage full, ignore
    }
    
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

