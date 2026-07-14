/**
 * PORTFOLIO DATA PROVIDER - Modular Function-Based System
 * Single source of truth for all themes.
 */

(function() {
  const SHEET_ID = '1jRHTJ6rC4UMLoBt1o26mfOlOzDTnGJGv'; // Sajid's Google Sheet ID
  const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

  const SHEETS = {
    INFO: 'Info',
    EXPERIENCE: 'Experience',
    EDUCATION: 'Education',
    SKILLS: 'Skills',
    PROJECTS: 'Projects'
  };

  // Definitive Offline Fallback / Base Data
  const LOCAL_DATA = {
    info: {
      name: "Sajid Islam",
      role: "Data Scientist & Business Analyst",
      heroText: "A Data & Business Analyst specialized in turning complex datasets into strategic growth. Based in Bangladesh, I lead data-ops at DEEN Commerce and previously optimized performance at Daraz (Alibaba Group).",
      photo: "img/profile.jpg",
      email: "sajid.islam.chowdhury@gmail.com",
      whatsapp: "+880 182 452 6054",
      github: "https://github.com/saajiidi",
      linkedin: "https://www.linkedin.com/in/sajidislamchowdhury/",
      huggingface: "https://huggingface.co/Sajid-ul-Islam",
      kaggle: "https://www.kaggle.com/saajiidi"
    },
    education: [
      {
        id: "edu-1",
        institution: "Academy of Business Professionals",
        degree: "PGD - Data Science & Business Analytics",
        date: "2025",
        location: "Dhaka, BD"
      },
      {
        id: "edu-2",
        institution: "North South University",
        degree: "BSc - Computer Science & Engineering",
        date: "2019",
        location: "Dhaka, BD"
      },
      {
        id: "edu-3",
        institution: "BAF Shaheen College Dhaka",
        degree: "Higher Secondary Certificate (HSC) (Science)",
        date: "2013",
        location: "Science Division"
      },
      {
        id: "edu-4",
        institution: "Uttara High School & College",
        degree: "Secondary School Certificate (SSC) (Science)",
        date: "2011",
        location: "Science Division"
      }
    ],
    experiences: [
      {
        id: "deencommerce",
        title: "Business Analyst",
        company: "Deen Commerce",
        location: "Mirpur, Dhaka",
        startDate: "June 2025",
        current: true,
        description: "Leading Business Strategy and CRM growth through granular performance tracking. Architecting weekly performance dashboards.",
        highlights: [
          "CRM Improvisation",
          "Business Strategy",
          "Architecting weekly performance dashboards for stakeholder reporting"
        ],
        technologies: ["CRM", "Business Analysis", "Strategy"]
      },
      {
        id: "gearmaster",
        title: "Co-Founder",
        company: "Gear Master",
        location: "Dhaka, BD",
        startDate: "Jun 2024",
        current: true,
        description: "Leading Business Operations for bike accessories retail. Managing inventory and multi-channel engagement.",
        highlights: [
          "Leading Business Operations for a bike accessories retail startup",
          "Managing inventory, sales growth strategies, and multi-channel customer engagement"
        ],
        technologies: ["Retail", "Business Management"]
      },
      {
        id: "nztex",
        title: "IT Executive",
        company: "NZ TEX GROUP",
        location: "Rupganj, Narayanganj",
        startDate: "Feb 2024",
        endDate: "May 2024",
        description: "Collaborated with the Research & Development Team to enhance product innovation. Delivered impactful presentations and reports to authorities and buyers.",
        highlights: [
          "Collaborated with the Research & Development Team to enhance product innovation",
          "Delivered impactful presentations and reports to authorities and buyers, enhancing stakeholder engagement"
        ],
        technologies: ["IT Support", "R&D", "Reporting"]
      },
      {
        id: "thrivingskills",
        title: "Associate – Online Sales & Customer Supports",
        company: "Thriving Skills",
        location: "Gulshan, Dhaka",
        startDate: "Oct 2023",
        endDate: "Jan 2024",
        description: "Conducted business and marketplace analysis; executed targeted sales strategies to increase customer loyalty and engagement.",
        highlights: [
          "Conducted comprehensive business and marketplace analysis, identifying opportunities that increased sales",
          "Designed and executed targeted sales strategies, resulting in a significant increase in customer loyalty and engagement",
          "Managed CRM systems to improve customer retention"
        ],
        technologies: ["Market Analysis", "CRM", "Sales Strategy"]
      },
      {
        id: "daraz",
        title: "Jr. Executive – Marketplace",
        company: "Daraz Bangladesh Ltd.",
        location: "Banani, Dhaka",
        startDate: "Jan 2020",
        endDate: "Jan 2022",
        description: "Increased partner acquisitions by 50% through targeted outreach strategies. Managed key accounts and increased client satisfaction by 20%.",
        highlights: [
          "Drove a 50% increase in partner acquisitions by implementing targeted outreach strategies and enhancing brand visibility",
          "Led successful campaigns and managed key accounts, increasing client satisfaction by 20% and driving revenue growth",
          "Optimized Marketplace Health through vendor performance tracking"
        ],
        technologies: ["Marketplace", "Acquisition", "Account Management"]
      },
      {
        id: "hungrynaki",
        title: "Associate – Home Kitchen & Street Food",
        company: "HungryNaki (Sister concern of Daraz)",
        location: "Banani, Dhaka",
        startDate: "Jul 2021",
        endDate: "Jan 2022",
        description: "Identified 15% growth opportunities through in-depth marketplace analysis. Spearheaded partner acquisition initiatives, increasing the network by 25%.",
        highlights: [
          "Conducted in-depth business and marketplace analysis, identifying 15% growth opportunities that increased revenue",
          "Spearheaded brand and partner acquisition initiatives, increasing partner network by 25%",
          "Leveraged BI tools to identify hyper-local food trends"
        ],
        technologies: ["Business Analysis", "Growth Strategy", "BI Tools"]
      }
    ],
    projects: [
      {
        id: "streamlit-hub",
        title: "Streamlit App Hub",
        description: "A centralized command center for 10+ operational data apps, including inventory trackers, sales dashboards, and automation tools.",
        image: "img/projects/streamlit-hub.png",
        liveUrl: "https://share.streamlit.io/user/saajiidi",
        featured: true,
        technologies: ["Python", "Streamlit", "Automation", "Data Ops"],
        category: "automation",
        caseStudy: {
          role: "Solutions Architect",
          timeline: "2024 - 2025",
          problem: "Operational tools were scattered across different deployments, making it difficult for stakeholders to find the right dashboard.",
          solution: "Consolidated all active Streamlit tools into a single shared workspace with unified data connectors.",
          impact: [
            "50% reduction in app discovery time for managers.",
            "Standardized data ingestion for all retail automation apps."
          ],
          metrics: [
            { label: "Active Apps", value: "10+" },
            { label: "Primary Stack", value: "Streamlit" }
          ]
        }
      },
      {
        id: "vscode-portfolio",
        title: "VS Code Themed Portfolio",
        description: "A high-performance portfolio built with Next.js 14, TypeScript, and Tailwind CSS, featuring a fully functional VS Code interface clone.",
        image: "img/projects/vscode-portfolio.png",
        liveUrl: "https://sajid-ul-islam.vercel.app/",
        featured: true,
        technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "React"],
        category: "web-apps",
        caseStudy: {
          role: "Full Stack Developer",
          timeline: "2024",
          problem: "Needed a unique, developer-centric way to showcase projects and skills beyond standard templates.",
          solution: "Architected a VS Code 'Shell' using Next.js App Router, combining file-tree navigation with code-themed content blocks.",
          impact: [
            "Achieved 95+ Lighthouse performance scores.",
            "Highly interactive UI that resonates with the developer community."
          ],
          metrics: [
            { label: "Performance", value: "98/100" },
            { label: "Tech Stack", value: "Next.js 14" }
          ]
        }
      },
      {
        id: "automation-pivot",
        title: "Automation Pivot",
        description: "Operations dashboard for DEEN Commerce, centralizing live order queues, historical sales analysis, and customer pulse tracking.",
        image: "img/projects/automation-pivot.png",
        liveUrl: "https://automation-pivot.streamlit.app/",
        featured: true,
        technologies: ["Streamlit", "Python", "Pandas", "Google Sheets API"],
        category: "bi-viz",
        caseStudy: {
          role: "Lead Business Analyst",
          timeline: "2024 - 2025",
          problem: "Operational data for DEEN Commerce was fragmented across multiple Google Sheets and local workbooks.",
          solution: "Built a centralized Python/Streamlit dashboard that merges live Google Sheets data with historical local archives.",
          impact: [
            "Streamlined packing and shipping workflows via Live Queue.",
            "Enabled real-time Customer Pulse monitoring (CLV, Retention)."
          ],
          metrics: [
            { label: "Data Source", value: "Hybrid GSheets/Local" },
            { label: "Efficiency", value: "Real-time Sync" }
          ]
        }
      },
      {
        id: "1",
        title: "ECommerce Dashboard",
        description: "A dashboard providing real-time data from 2021-2025, featuring analytics for total revenue, total orders, total customers, and average order value.",
        image: "img/projects/ecommerce.png",
        liveUrl: "https://e-com-dashborad.vercel.app/",
        featured: true,
        technologies: ["Dashboard", "React", "Analytics", "E-commerce"],
        category: "bi-viz",
        caseStudy: {
          role: "Data Analyst & Dashboard Builder",
          timeline: "2021–2025 dataset",
          problem: "Stakeholders needed a single view of revenue, orders, customers, and AOV trends.",
          solution: "Built a KPI dashboard consolidating 2021–2025 sales data into a unified view.",
          impact: [
            "Improved visibility into marketplace performance trends.",
            "Standardized KPI definitions for recurring reviews."
          ],
          metrics: [
            { label: "Time Range", value: "2021–2025" },
            { label: "Core KPIs", value: "4" }
          ]
        }
      },
      {
        id: "2",
        title: "Sheet2WhatsApp",
        description: "Automates WhatsApp link generation from Excel/CSV files.",
        image: "img/projects/whatsapp.png",
        liveUrl: "https://sheet2whatsapp.streamlit.app/",
        featured: true,
        technologies: ["Streamlit", "Python", "Pandas", "Vercel"],
        category: "automation",
        caseStudy: {
          role: "Builder",
          timeline: "2024",
          problem: "Creating WhatsApp links from spreadsheets was manual and error-prone.",
          solution: "Streamlit app that converts CSV/Excel rows into share-ready WhatsApp links.",
          impact: [
            "Reduced copy/paste effort for outreach.",
            "Improved accuracy of contact links."
          ],
          metrics: [
            { label: "Input", value: "CSV/Excel" },
            { label: "Output", value: "WhatsApp links" }
          ]
        }
      },
      {
        id: "3",
        title: "Sentinel Bangladesh",
        description: "An interactive security incident map for Bangladesh, featuring cluster analysis, heatmaps, and detailed incident tracking.",
        image: "img/projects/sentinel.png",
        liveUrl: "https://sentinelbangladesh.streamlit.app/",
        featured: true,
        technologies: ["Streamlit", "Python", "Data Visualization", "Security Analysis"],
        category: "bi-viz",
        caseStudy: {
          role: "Data Visualization",
          timeline: "2024",
          problem: "Security incidents needed spatial insight at scale.",
          solution: "Interactive map with clustering, heatmaps, and drill-down incident details.",
          impact: [
            "Faster pattern discovery across regions.",
            "Clearer communication of incident density."
          ],
          metrics: [{ label: "Map Layers", value: "Clusters + Heatmap + Points" }]
        }
      },
      {
        id: "4",
        title: "Order Process Automation",
        description: "Automates order processing and formatting from Excel files, featuring consolidation and categorization.",
        image: "img/projects/automation.png",
        liveUrl: "https://order-process-automation.streamlit.app/",
        featured: true,
        technologies: ["Streamlit", "Python", "Automation", "Data Processing"],
        category: "automation",
        caseStudy: {
          role: "Automation Engineer",
          timeline: "2024",
          problem: "Order sheets required manual consolidation and formatting.",
          solution: "Automated ingestion, cleaning, and categorization of Excel orders.",
          impact: ["Faster order preparation.", "Consistent output formatting."],
          metrics: [
            { label: "Input", value: "Excel" },
            { label: "Output", value: "Formatted sheets" }
          ]
        }
      },
      {
        id: "agentic-ai-assistant",
        title: "Agentic AI Research Assistant",
        description: "An intelligent AI agent system with RAG capabilities for automated research, document analysis, and knowledge synthesis.",
        image: "img/projects/agentic-ai.png",
        githubUrl: "https://github.com/Sajid-ul-Islam/",
        featured: true,
        technologies: ["Agentic AI", "RAG", "LangChain", "Vector DB", "Python"],
        category: "ml-ai",
        caseStudy: {
          role: "AI Engineer & Architect",
          timeline: "2025",
          problem: "Manual research and knowledge synthesis was time-consuming and inefficient for large document sets.",
          solution: "Built an autonomous AI agent system that can retrieve, analyze, and synthesize information from multiple sources using RAG architecture.",
          impact: [
            "Reduced research time by 70% through automated document processing.",
            "Improved knowledge accuracy with contextual retrieval.",
            "Enabled real-time question answering on complex topics."
          ],
          metrics: [
            { label: "Documents Processed", value: "1000+" },
            { label: "Accuracy Rate", value: "94%" },
            { label: "Response Time", value: "<2s" }
          ]
        }
      },
      {
        id: "5",
        title: "Air Passenger Forecasting",
        description: "Time series analysis comparing multiple forecasting models (ARIMA, Exponential Smoothing) for airline passenger prediction.",
        image: "img/projects/air-passengers.png",
        liveUrl: "https://sajid-ul-islam.github.io/Air_Passengers_Forecasting_Models/",
        featured: true,
        technologies: ["Machine Learning", "Time Series", "Python"],
        category: "ml-ai",
        caseStudy: {
          role: "Data Scientist",
          timeline: "2023",
          problem: "Forecast air passenger demand using multiple time-series models.",
          solution: "Compared ARIMA and Exponential Smoothing forecasts.",
          impact: ["Enabled model comparison for planning scenarios."],
          metrics: [{ label: "Models", value: "ARIMA, Exp. Smoothing" }]
        }
      },
      {
        id: "6",
        title: "Ramadan Compass",
        description: "A comprehensive Ramadan companion app featuring prayer times, Qibla compass, and daily goals tracking. Built with Next.js.",
        image: "img/projects/ramadan-compass.png",
        liveUrl: "https://ramadancompass.vercel.app/",
        featured: true,
        technologies: ["Next.js", "Ramadan", "Prayer Times", "React", "PWA"],
        category: "web-apps",
        caseStudy: {
          role: "Frontend Engineer",
          timeline: "2024",
          problem: "Users needed prayer times, Qibla, and daily goals in one place.",
          solution: "Next.js PWA combining daily utilities and reminders.",
          impact: ["Simplified daily Ramadan routines in a single app."],
          metrics: [
            { label: "Platform", value: "PWA" },
            { label: "Core Features", value: "Prayer times + Qibla" }
          ]
        }
      },
      {
        id: "tomyinfida",
        title: "ToMyInfida",
        description: "A beautiful, interactive love letter creator with password protection, scheduled unlocking, and customizable themes.",
        image: "img/projects/tomyinfida.png",
        liveUrl: "https://letter2dear.surge.sh/",
        featured: true,
        technologies: ["HTML", "CSS", "JavaScript", "Romantic Design"],
        category: "web-apps",
        caseStudy: {
          role: "Developer & Designer",
          timeline: "2024",
          problem: "Digital messages often lack the sentiment and surprise of a hand-written letter.",
          solution: "Built a themed, interactive letter platform with security and timed-release features.",
          impact: [
            "Enhanced digital intimacy through thoughtful UI.",
            "Implemented password-protected private letter delivery."
          ],
          metrics: [
            { label: "Design", value: "Premium/Romantic" },
            { label: "Features", value: "Timed/Protected" }
          ]
        }
      },
      {
        id: "churn-analysis",
        title: "Customer Churn Analysis",
        description: "Predictive modeling using Python to identify at-risk customers. Implementation of Random Forest and XGBoost with 85%+ accuracy.",
        image: "img/projects/churn-analysis.png",
        githubUrl: "https://github.com/Sajid-ul-Islam/Customer-Churn-Prediction/",
        featured: true,
        technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest"],
        category: "ml-ai",
        caseStudy: {
          role: "ML Engineer",
          timeline: "2023",
          problem: "Identify at-risk customers before churn.",
          solution: "Built Random Forest and XGBoost models for churn prediction.",
          impact: ["Improved visibility into churn drivers."],
          metrics: [
            { label: "Reported Accuracy", value: "85%+" },
            { label: "Models", value: "RF + XGBoost" }
          ]
        }
      },
      {
        id: "security-map",
        title: "Security Map Visualization",
        description: "Interactive map-based visualization of security events developed using R, Folium, and Leaflet with temporal sliders.",
        image: "img/projects/security-map.png",
        liveUrl: "https://trr-bd.vercel.app",
        featured: true,
        technologies: ["R", "Folium", "Leaflet", "Data Viz"],
        category: "bi-viz",
        caseStudy: {
          role: "Data Visualization",
          timeline: "2023",
          problem: "Visualize security events with spatial and temporal context.",
          solution: "R + Folium + Leaflet map with temporal sliders.",
          impact: ["Improved spatial + temporal analysis for stakeholders."],
          metrics: [{ label: "Tech", value: "R, Folium, Leaflet" }]
        }
      },
      {
        id: "gdp-debt",
        title: "Economic Analysis",
        description: "Analysis of GDP vs Debt Correlation across global economies.",
        image: "img/projects/gdp-debt.png",
        liveUrl: "https://sajid-ul-islam.github.io/Economic-Analysis-GDP-vs-Debt-Correlation/",
        featured: true,
        technologies: ["Data Analysis", "Economics", "Python"],
        category: "bi-viz",
        caseStudy: {
          role: "Analyst",
          timeline: "2022",
          problem: "Understand GDP vs debt correlation across countries.",
          solution: "Cross-country analysis with comparative visuals.",
          impact: ["Highlighted macroeconomic patterns and outliers."],
          metrics: [{ label: "Scope", value: "Global economies" }]
        }
      },
      {
        id: "7",
        title: "E-Commerce Platform",
        description: "Modern e-commerce interface built with React.js featuring responsive design, product catalog, shopping cart functionality.",
        image: "img/projects/ecommerce-platform.png",
        liveUrl: "https://gear-master.vercel.app/",
        featured: false,
        technologies: ["React", "E-commerce", "Frontend"],
        category: "web-apps",
        caseStudy: {
          role: "Frontend Engineer",
          timeline: "2022",
          problem: "Need a modern, responsive e-commerce interface.",
          solution: "React UI with catalog and cart workflows.",
          impact: ["Delivered a clean, mobile-ready shopping experience."],
          metrics: [{ label: "Modules", value: "Catalog + Cart" }]
        }
      },
      {
        id: "8",
        title: "Day Progress Plus",
        description: "A productivity focused application featuring day progress tracking, focus task management, and customizable settings.",
        image: "img/projects/day-progress.png",
        liveUrl: "https://sajid-ul-islam.github.io/TimeTracker/",
        featured: false,
        technologies: ["Productivity", "React", "Utility"],
        category: "web-apps",
        caseStudy: {
          role: "Productivity App Builder",
          timeline: "2022",
          problem: "Track daily progress and focus tasks in one view.",
          solution: "Day progress tracker with focus task management.",
          impact: ["Improved daily planning and focus."],
          metrics: [{ label: "Features", value: "Progress + Focus tasks" }]
        }
      },
      {
        id: "9",
        title: "Growth Analysis Dashboard",
        description: "A comprehensive web development project showcasing modern web technologies and best practices.",
        image: "img/projects/growth-dashboard.png",
        liveUrl: "https://sajid-ul-islam.github.io/Growth-Analysis-Dashboard/",
        featured: false,
        technologies: ["Web Dev", "React", "Analytics"],
        category: "bi-viz",
        caseStudy: {
          role: "Frontend Engineer",
          timeline: "2022",
          problem: "Centralize growth metrics into a single dashboard.",
          solution: "Analytics dashboard showcasing key KPIs.",
          impact: ["Simplified growth reporting for quick reviews."],
          metrics: [{ label: "Focus", value: "Analytics KPIs" }]
        }
      },
      {
        id: "10",
        title: "Border Security Analysis",
        description: "Data visualization project analyzing border incident trends in Bangladesh using statistical methods.",
        image: "img/projects/border-analysis.png",
        liveUrl: "https://sajid-ul-islam.github.io/Border-Killing-Trend-in-Bangladesh/",
        featured: false,
        technologies: ["Data Viz", "Statistics", "Social Impact"],
        category: "bi-viz",
        caseStudy: {
          role: "Data Analyst",
          timeline: "2021",
          problem: "Analyze border incident trends in Bangladesh.",
          solution: "Statistical analysis with clear visualizations.",
          impact: ["Made incident trends easier to interpret."],
          metrics: [{ label: "Methods", value: "Stats + Data Viz" }]
        }
      },
      {
        id: "11",
        title: "Image Scraper",
        description: "Versatile Python tool for downloading images from Pinterest with multiple interfaces including web UI and command line.",
        image: "img/projects/img-scraper.png",
        liveUrl: "https://img-scraper.streamlit.app/",
        featured: false,
        technologies: ["Python", "Scraping", "Automation"],
        category: "automation",
        caseStudy: {
          role: "Python Developer",
          timeline: "2021",
          problem: "Collect images from Pinterest efficiently.",
          solution: "Python tool with web UI and CLI options.",
          impact: ["Faster dataset creation for research and projects."],
          metrics: [{ label: "Interfaces", value: "Web UI + CLI" }]
        }
      },
      {
        id: "12",
        title: "Tableau Portfolio",
        description: "Demographics, economic analysis, and security incident maps.",
        image: "img/projects/tableau-portfolio.png",
        liveUrl: "https://public.tableau.com/app/profile/sajid.islam4721/viz/MuslimPopulationbyEthinicity/Dashboard1",
        featured: false,
        technologies: ["Tableau", "Data Visualization"],
        category: "bi-viz",
        caseStudy: {
          role: "BI Analyst",
          timeline: "2021",
          problem: "Showcase Tableau dashboards in one place.",
          solution: "Published portfolio of interactive dashboards.",
          impact: ["Centralized BI work for easy sharing."],
          metrics: [{ label: "Platform", value: "Tableau Public" }]
        }
      },
      {
        id: "13",
        title: "B2B StockLot E-Commerce",
        description: "Web development project for B2B e-commerce.",
        image: "img/projects/b2b-ecommerce.png",
        liveUrl: "https://github.com/Sajid-ul-Islam/B2B-StockLot-E-Commerce-BD",
        featured: false,
        technologies: ["HTML/CSS", "JavaScript", "Web Dev"],
        category: "web-apps",
        caseStudy: {
          role: "Web Developer",
          timeline: "2020",
          problem: "Create an online presence for B2B stock lot sales.",
          solution: "Static site built with HTML, CSS, and JavaScript.",
          impact: ["Provided a basic online storefront."],
          metrics: [{ label: "Stack", value: "HTML/CSS/JS" }]
        }
      }
    ],
    blogPosts: [
      {
        id: "blog-1",
        title: "Optimizing Retail BI: A Daraz Case Study",
        date: "Oct 12, 2024",
        excerpt: "Deep dive into how we increased partner acquisitions by 50% using automated funnel tracking.",
        tags: ["BI", "Case Study", "Growth"],
        url: "https://www.linkedin.com/pulse/optimizing-retail-bi-daraz-case-study-sajid-islam/"
      },
      {
        id: "blog-2",
        title: "Python for Automation: Pinterest Scrapers",
        date: "Sep 05, 2024",
        excerpt: "Technical walkthrough of building mass-image downloaders for dataset creation.",
        tags: ["Python", "Automation", "NLP"],
        url: "https://www.linkedin.com/pulse/python-automation-pinterest-scrapers-sajid-islam/"
      },
      {
        id: "blog-3",
        title: "Modern Dashboards: Beyond Aesthetics",
        date: "Aug 20, 2024",
        excerpt: "Why readability wins over flashy animations when building mission-critical tools.",
        tags: ["Data Viz", "UI/UX", "Analytics"],
        url: "https://www.linkedin.com/pulse/modern-dashboards-beyond-aesthetics-sajid-islam/"
      }
    ],
    learningItems: [
      { name: "Agentic Workflows (LangGraph/CrewAI)", category: "AI", progress: 82 },
      { name: "Advanced RAG & Vector DBs", category: "AI", progress: 85 },
      { name: "LLM Fine-Tuning (LoRA/QLoRA)", category: "ML", progress: 65 },
      { name: "Modern Data Stack (dbt & Snowflake)", category: "Data Ops", progress: 70 },
      { name: "Real-Time Streaming Analytics", category: "BI", progress: 60 },
      { name: "MLOps & Model Deployment", category: "ML", progress: 75 }
    ],
    gaming: {
      stats: [
        { label: "HOURS_LOGGED", value: "2400+" },
        { label: "STRATEGY_MASTERY", value: "ELITE" },
        { label: "SERVER_RANK", value: "#12" }
      ],
      favorites: [
        { name: "Red Dead Redemption 2", category: "Masterpiece" },
        { name: "God of War Ragnarok", category: "Storytelling" },
        { name: "FC24 / FIFA", category: "Competitive" },
        { name: "Ghost of Tsushima", category: "Visuals" }
      ]
    },
    fileTreeData: [
      {
        id: "explorer",
        label: "EXPLORER",
        isOpen: true,
        items: [
          { id: "sajid-ul-islam-site", label: "sajid-ul-islam.github.io", href: "https://sajid-ul-islam.github.io/", icon: "globe", extension: "link" }
        ]
      },
      {
        id: "portfolio",
        label: "PORTFOLIO",
        isOpen: true,
        items: [
          { id: "home", label: "Welcome", href: "/", icon: "home", extension: "tsx" },
          { id: "experience", label: "Experience", href: "#experience", icon: "briefcase", extension: "tsx" },
          { id: "skills", label: "Skills", href: "#skills", icon: "code", extension: "json" },
          { id: "projects", label: "Projects", href: "#projects", icon: "folder", extension: "tsx" },
          { id: "education", label: "Education", href: "#education", icon: "graduation-cap", extension: "tsx" },
          { id: "family", label: "Family", href: "#family", icon: "users", extension: "tsx" },
          { id: "contact", label: "Contact", href: "#contact", icon: "mail", extension: "tsx" }
        ]
      },
      {
        id: "hobbies",
        label: "HOBBIES",
        isOpen: false,
        items: [
          { id: "favorites", label: "Favorites", href: "/Favorites", icon: "star", extension: "tsx" },
          { id: "gaming", label: "Gaming", href: "/Gaming", icon: "gamepad-2", extension: "tsx" },
          { id: "blogs", label: "Blogs", href: "/Blogs", icon: "book-open", extension: "md" }
        ]
      },
      {
        id: "more",
        label: "MORE",
        isOpen: false,
        items: [
          { id: "learning", label: "Learning", href: "/Learning", icon: "graduation-cap", extension: "tsx" },
          { id: "startup", label: "Startup", href: "/Startup", icon: "rocket", extension: "tsx" }
        ]
      }
    ],
    socialLinks: [
      { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/sajidislamchowdhury/", icon: "linkedin", color: "#0077b5" },
      { id: "github", name: "GitHub", url: "https://github.com/saajiidi", icon: "github", color: "#333333" },
      { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/+8801824526054", icon: "message-circle", color: "#25D366" },
      { id: "resume", name: "Resume", url: "resume.html", icon: "file-text", color: "#da552f" },
      { id: "huggingface", name: "Hugging Face", url: "https://huggingface.co/Sajid-ul-Islam", icon: "robot", color: "#FFD21E" }
    ],
    skillGroups: [
      {
        name: "Business & Strategy",
        skills: [
          { name: "Market Research", category: "Strategy", icon: "https://img.icons8.com/color/48/000000/search--v1.png", level: 90 },
          { name: "Product Development", category: "Strategy", icon: "https://img.icons8.com/color/48/000000/product--v1.png", level: 85 },
          { name: "Business Development", category: "Strategy", icon: "https://img.icons8.com/color/48/000000/conference-call.png", level: 88 },
          { name: "Business Intelligence", category: "Strategy", icon: "https://img.icons8.com/color/48/000000/business-report.png", level: 92 }
        ]
      },
      {
        name: "Analytical & Technical",
        skills: [
          { name: "Data Analytics & ML", category: "Data", icon: "https://img.icons8.com/color/48/null/python--v1.png", level: 85 },
          { name: "Agentic AI Systems", category: "AI", icon: "https://img.icons8.com/color/48/000000/robot-intellectual.png", level: 82 },
          { name: "RAG (Retrieval-Augmented Generation)", category: "AI", icon: "https://img.icons8.com/color/48/000000/artificial-intelligence.png", level: 78 },
          { name: "Machine Learning Engineering", category: "AI", icon: "https://img.icons8.com/color/48/000000/neural-network.png", level: 85 },
          { name: "Python & R", category: "Data", icon: "https://img.icons8.com/color/48/000000/python.png", level: 85 },
          { name: "Data Visualization", category: "BI", icon: "https://img.icons8.com/color/48/000000/combo-chart.png", level: 92 },
          { name: "Prompt Engineering", category: "AI", icon: "https://img.icons8.com/color/48/000000/robot-intellectual.png", level: 88 },
          { name: "Agentic RAG", category: "AI", icon: "https://img.icons8.com/color/48/000000/artificial-intelligence.png", level: 85 }
        ]
      },
      {
        name: "Web Development",
        skills: [
          { name: "React", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/react-native.png", level: 75 },
          { name: "JavaScript", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/javascript--v1.png", level: 80 },
          { name: "HTML5 & CSS3", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/html-5--v1.png", level: 90 },
          { name: "Basic Web Dev", category: "Frontend", icon: "https://img.icons8.com/color/48/000000/source-code.png", level: 70 }
        ]
      }
    ]
  };

  // State hold for session
  let portfolioDataState = JSON.parse(localStorage.getItem('portfolio-data-cache')) || LOCAL_DATA;

  // Helper functions for CSV Parsing
  function parseCSV(csvText) {
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

  async function fetchSheetData(sheetName) {
    try {
      const response = await fetch(`${BASE_URL}${sheetName}`);
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const text = await response.text();
      return parseCSV(text);
    } catch (err) {
      console.warn(`[PORTFOLIO_DATA] Fetch failed for sheet "${sheetName}". Using cache/local fallback.`, err);
      return null;
    }
  }

  // --- Modular Data Sync & Loading ---
  async function loadPortfolioData() {
    console.log('[PORTFOLIO_DATA] Initiating secure data sync...');

    const [infoData, experienceData, educationData, skillsData, projectsData] = await Promise.all([
      fetchSheetData(SHEETS.INFO),
      fetchSheetData(SHEETS.EXPERIENCE),
      fetchSheetData(SHEETS.EDUCATION),
      fetchSheetData(SHEETS.SKILLS),
      fetchSheetData(SHEETS.PROJECTS)
    ]);

    let mergedData = { ...portfolioDataState };

    // 1. Merge Info
    if (infoData && infoData.length > 0) {
      const newInfo = {};
      infoData.forEach(item => {
        const key = item.Key || item.key;
        const val = item.Value || item.value;
        if (key && val) {
          // Normalize keys to camelCase
          const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
          newInfo[normalizedKey] = val;
        }
      });
      mergedData.info = { ...mergedData.info, ...newInfo };
    }

    // 2. Merge Experiences
    if (experienceData && experienceData.length > 0) {
      mergedData.experiences = experienceData.map(item => {
        const highlights = [];
        if (item.Bullet1) highlights.push(item.Bullet1);
        if (item.Bullet2) highlights.push(item.Bullet2);
        if (item.Bullet3) highlights.push(item.Bullet3);
        return {
          id: item.id || item.Id || `exp-${Math.random().toString(36).substr(2, 9)}`,
          title: item.Role || item.title || '',
          company: item.Company || item.company || '',
          startDate: item.Date || item.startDate || '',
          endDate: item.endDate || '',
          highlights: highlights,
          description: item.Description || item.description || highlights.join(' '),
          category: item.Category || item.category || 'history'
        };
      });
    }

    // 3. Merge Education
    if (educationData && educationData.length > 0) {
      mergedData.education = educationData.map((item, idx) => {
        return {
          id: item.id || `edu-${idx}`,
          institution: item.Institution || item.institution || '',
          degree: item.Degree || item.degree || '',
          date: item.Date || item.date || '',
          location: item.Location || item.location || 'Dhaka, BD'
        };
      });
    }

    // 4. Merge Skills
    if (skillsData && skillsData.length > 0) {
      // Reconstruct simple skills category mapping
      const categoriesMap = {};
      skillsData.forEach(item => {
        const cat = item.Category || item.category || 'Other';
        const formattedCat = cat === 'core' ? 'Analytical & Technical' : (cat === 'tools' ? 'Business & Strategy' : cat);
        if (!categoriesMap[formattedCat]) {
          categoriesMap[formattedCat] = [];
        }
        categoriesMap[formattedCat].push({
          name: item.Skill || item.skill || '',
          level: parseInt(item.Value || item.value || '80', 10),
          category: cat
        });
      });

      // Convert back to group format
      mergedData.skillGroups = Object.keys(categoriesMap).map(name => ({
        name: name,
        skills: categoriesMap[name]
      }));
    }

    // 5. Merge Projects
    if (projectsData && projectsData.length > 0) {
      mergedData.projects = projectsData.map(item => {
        const toolsList = item.Tools ? item.Tools.split(',').map(t => t.trim()) : [];
        return {
          id: item.id || `proj-${Math.random().toString(36).substr(2, 9)}`,
          title: item.Title || item.title || 'Untitled Project',
          description: item.Description || item.description || '',
          image: item.Image || item.image || 'img/project-placeholder.jpg',
          liveUrl: item.Link || item.liveUrl || '',
          githubUrl: item.githubUrl || '',
          featured: item.Featured || item.featured || true,
          technologies: toolsList,
          category: item.Category || item.category || 'all',
          caseStudy: {
            problem: item.Problem || '',
            solution: item.Approach || '',
            impact: item.Impact ? [item.Impact] : []
          }
        };
      });
    }

    // Store state in local cache & runtime memory
    portfolioDataState = mergedData;
    localStorage.setItem('portfolio-data-cache', JSON.stringify(mergedData));
    return mergedData;
  }

  // --- Exposed Functional API ---
  window.PortfolioData = {
    // Pure getter functions
    getInfo: () => portfolioDataState.info,
    getExperiences: () => portfolioDataState.experiences,
    getEducation: () => portfolioDataState.education,
    getProjects: () => portfolioDataState.projects,
    getSkills: () => portfolioDataState.skillGroups,
    getBlogPosts: () => portfolioDataState.blogPosts,
    getLearning: () => portfolioDataState.learningItems,
    getGaming: () => portfolioDataState.gaming,
    getSocialLinks: () => portfolioDataState.socialLinks,
    getFileTree: () => portfolioDataState.fileTreeData,
    
    // Core modular sync loading function
    load: async () => {
      try {
        await loadPortfolioData();
      } catch (err) {
        console.warn('[PORTFOLIO_DATA] Sync failed, running on cached/fallback data.', err);
      }
      return portfolioDataState;
    }
  };

  // Pre-expose simple window.DATA for backward compatibility
  window.DATA = portfolioDataState;
})();
