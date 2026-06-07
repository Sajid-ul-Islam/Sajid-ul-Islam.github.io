/**
 * TACTICAL DATA ENGINE - v2.0
 * Restoring original data and fixing filtering bugs.
 */

const SHEET_ID = '1jRHTJ6rC4UMLoBt1o26mfOlOzDTnGJGv'; // Sajid's Portfolio Sheet
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

const SHEETS = {
    INFO: 'Info',
    EXPERIENCE: 'Experience',
    EDUCATION: 'Education',
    SKILLS: 'Skills',
    PROJECTS: 'Projects',
    AWARDS: 'Awards'
};

const DEFAULT_INFO = {
    Name: 'Sajid Islam',
    Role: 'Data Scientist & Business Analyst',
    HeroText: 'A Data & Business Analyst specialized in turning complex datasets into strategic growth. Based in Bangladesh, I lead data-ops at DEEN Commerce and previously optimized performance at Daraz (Alibaba Group).'
};

/**
 * Typewriter Effect Class
 */
class Typewriter {
    constructor(el, text, speed = 50) {
        this.el = el;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.el.innerHTML = '';
        this.el.classList.add('typewriter-cursor');

        const sessionID = Math.random().toString(36).substr(2, 9);
        this.el.setAttribute('data-session', sessionID);
        this.sessionID = sessionID;
    }
    type() {
        if (this.el.getAttribute('data-session') !== this.sessionID) return;

        if (this.index < this.text.length) {
            this.el.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.el.classList.remove('typewriter-cursor');
        }
    }
}

function runTypewriter(info) {
    const tH1 = document.getElementById('typewriter-h1');
    const tP = document.getElementById('typewriter-p');

    if (tH1) {
        tH1.parentElement.style.opacity = '1';
        const h1Text = `Hi, I'm ${info.Name.split(' ')[0]} 👋`;
        new Typewriter(tH1, h1Text, 120).type();
    }

    if (tP) {
        const pText = info.HeroText || "Analyzing data for strategic growth.";
        setTimeout(() => {
            tP.parentElement.style.opacity = '1';
            new Typewriter(tP, pText, 60).type();
        }, 2200);
    }
}

async function fetchSheetData(sheetName) {
    try {
        const response = await fetch(`${BASE_URL}${sheetName}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.warn(`[DATA_FAIL] Using local fallback for ${sheetName}.`);
        return [];
    }
}

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

async function initializeTacticalData() {
    console.log('[SYNC] Connecting to Intel Grid...');

    runTypewriter(DEFAULT_INFO);

    const [infoData, experience, education, skills, projects, awards] = await Promise.all([
        fetchSheetData(SHEETS.INFO),
        fetchSheetData(SHEETS.EXPERIENCE),
        fetchSheetData(SHEETS.EDUCATION),
        fetchSheetData(SHEETS.SKILLS),
        fetchSheetData(SHEETS.PROJECTS),
        fetchSheetData(SHEETS.AWARDS)
    ]);

    const finalProjects = projects.length > 0 ? projects : (window.DATA ? window.DATA.projects : []);
    const finalExperience = experience.length > 0 ? experience : (window.DATA ? window.DATA.experiences : []);
    const finalSkills = skills.length > 0 ? skills : (window.DATA ? window.DATA.skillGroups : []);

    // Dynamically inject the Streamlit project
    if (!finalProjects.find(p => p.liveUrl === 'https://global-economics.streamlit.app')) {
        finalProjects.push({
            id: 'global-eco',
            title: 'Global Economics Dashboard',
            description: 'An interactive Streamlit web application visualizing global economic indicators, providing strategic data analysis on worldwide market trends.',
            technologies: ['Python', 'Streamlit', 'Pandas', 'Data Viz'],
            category: 'dashboard',
            liveUrl: 'https://global-economics.streamlit.app',
            featured: true,
            caseStudy: {
                problem: 'Need for real-time visualization of complex global economic datasets.',
                solution: 'Built a responsive Streamlit dashboard to aggregate and display key economic metrics interactively.',
                impact: ['Improved data accessibility', 'Streamlined economic analysis workflow']
            }
        });
    }

    // Dynamically inject the Streamlit Hub project
    if (!finalProjects.find(p => p.liveUrl === 'https://share.streamlit.io/user/saajiidi')) {
        finalProjects.unshift({
            id: 'streamlit-hub',
            title: 'Streamlit App Hub',
            description: 'A centralized command center for 10+ operational data apps, including inventory trackers, sales dashboards, and automation tools.',
            technologies: ['Python', 'Streamlit', 'Data Ops', 'Automation'],
            category: 'dashboard',
            liveUrl: 'https://share.streamlit.io/user/saajiidi',
            featured: true,
            caseStudy: {
                problem: 'Operational tools were scattered across different deployments, making it difficult for stakeholders to find the right dashboard.',
                solution: 'Consolidated all active Streamlit tools into a single shared workspace with unified data connectors.',
                impact: ['50% reduction in app discovery time', 'Standardized data ingestion']
            }
        });
    }

    if (infoData.length > 0) {
        const info = {};
        infoData.forEach(item => { info[item.Key] = item.Value; });
        renderInfo(info);
    }

    if (finalExperience.length > 0) renderExperience(finalExperience);
    if (education.length > 0) renderEducation(education);

    if (finalSkills.length > 0) {
        if (window.DATA && window.DATA.skillGroups) renderSkillGroups(window.DATA.skillGroups);
        else renderSkills(finalSkills);
    }

    if (finalProjects.length > 0) {
        renderProjects(finalProjects);
        initializeProjectFilters();
        if (window.DATA && window.DATA.fileTreeData) {
            const projectsFolder = window.DATA.fileTreeData.find(f => f.id === 'portfolio');
            if (projectsFolder) {
                const featuredProjects = finalProjects.filter(p => p.featured).map(p => ({
                    id: `project-${p.id}`,
                    label: p.title.split(' ')[0],
                    href: p.liveUrl || p.githubUrl || `#projects`,
                    icon: 'code',
                    extension: p.technologies.includes('Python') ? 'py' : (p.technologies.includes('React') ? 'tsx' : 'ts')
                }));
                window.DATA.fileTreeData.push({ id: 'featured-ops', label: 'FEATURED_OPS', isOpen: true, items: featuredProjects });
            }
        }
    }
    if (awards.length > 0) renderAwards(awards);

    if (window.DATA) {
        if (window.DATA.blogPosts) renderBlogs(window.DATA.blogPosts);
        if (window.DATA.learningItems) renderLearning(window.DATA.learningItems);
        if (window.DATA.gaming) renderGaming(window.DATA.gaming);
        if (window.DATA.favoriteMedia) renderMedia(window.DATA.favoriteMedia);
        if (window.DATA.fileTreeData) renderFileTree(window.DATA.fileTreeData);
    }

    if (window.TACTICAL_INFO && window.TACTICAL_INFO.Github) fetchGithubRepos(window.TACTICAL_INFO.Github.split('/').pop());
    else fetchGithubRepos('saajiidi');

    initAIChat();

    setTimeout(() => {
        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('fade-out'));
    }, 500);
}

function renderInfo(info) {
    if (!info.Name) return;
    runTypewriter(info);
    document.title = `${info.Name} || [TACTICAL_INTEL]`;
    document.querySelectorAll('.data-name').forEach(el => el.innerText = info.Name);
    document.querySelectorAll('.data-role').forEach(el => el.innerText = info.Role);
    window.TACTICAL_INFO = info;

    if (info.Github) document.querySelectorAll('[title="GitHub"]').forEach(a => a.href = info.Github);
    if (info.LinkedIn) document.querySelectorAll('[title="LinkedIn"]').forEach(a => a.href = info.LinkedIn);
    if (info.Kaggle) document.querySelectorAll('[title="Kaggle"]').forEach(a => a.href = info.Kaggle);
    if (info.HuggingFace || DEFAULT_INFO.HuggingFace) document.querySelectorAll('[title="Hugging Face"]').forEach(a => a.href = info.HuggingFace || DEFAULT_INFO.HuggingFace);

    const waSpan = document.getElementById('contact-details');
    if (waSpan && info.Whatsapp && info.Email) {
        waSpan.innerHTML = `
          <div class="mb-4">
            <label class="section-label small mb-2">ENCRYPTED_EMAIL</label>
            <div class="d-flex align-items-center justify-content-between p-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25">
              <span>${info.Email}</span>
              <button class="btn btn-sm btn-outline-primary" onclick="copyEmail('${info.Email}', event)">COPY</button>
            </div>
          </div>
          <div class="mb-4">
            <label class="section-label small mb-2">DIRECT_SIGNAL</label>
            <div class="d-flex align-items-center justify-content-between p-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25">
              <span>${info.Whatsapp}</span>
              <a href="https://wa.me/${info.Whatsapp.replace(/\D/g, '')}" target="_blank" class="btn btn-sm btn-primary">WHATSAPP</a>
            </div>
          </div>
        `;
    }
}

function renderExperience(data) {
    const container = document.getElementById('experience-list');
    if (!container) return;
    if (!Array.isArray(data)) {
        console.error('[TACTICAL_DATA] renderExperience: data is not an array', data);
        container.innerHTML = '<div class="text-danger p-3">[ERROR] Invalid experience data format</div>';
        return;
    }
    container.innerHTML = '';
    try {
        data.forEach(item => {
            const highlights = item.highlights ? item.highlights.map(h => `<li class="mb-2"><i class="fas fa-microchip text-primary me-2"></i> ${h}</li>`).join('') : '';
            container.insertAdjacentHTML('beforeend', `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="resume-item mb-5">
                  <div class="resume-content">
                    <h3 class="mb-1 text-light">${item.title || item.Role}</h3>
                    <div class="subheading mb-3 text-primary">${item.company || item.Company}</div>
                    <ul class="list-unstyled text-secondary">${highlights}</ul>
                  </div>
                  <div class="resume-date"><span>${item.startDate || item.Date}${item.endDate ? ` — ${item.endDate}` : ''}</span></div>
                </div>
              </div>
            `);
        });
    } catch (err) {
        console.error('[TACTICAL_DATA] renderExperience error:', err);
        container.innerHTML = '<div class="text-danger p-3">[ERROR] Failed to render experience</div>';
    }
}

function renderEducation(data) {
    const container = document.getElementById('education-list');
    if (!container) return;
    if (!Array.isArray(data)) {
        console.error('[TACTICAL_DATA] renderEducation: data is not an array', data);
        container.innerHTML = '<div class="text-danger p-3">[ERROR] Invalid education data format</div>';
        return;
    }
    container.innerHTML = '';
    try {
        data.forEach(item => {
            container.insertAdjacentHTML('beforeend', `
              <div class="timeline-item"><div class="timeline-dot"></div>
                <div class="resume-item mb-4">
                  <h3 class="mb-0">${item.Institution}</h3>
                  <div class="subheading mb-2 text-primary">${item.Degree}</div>
                  <div class="resume-date"><span>${item.Date}</span></div>
                </div>
              </div>
            `);
        });
    } catch (err) {
        console.error('[TACTICAL_DATA] renderEducation error:', err);
        container.innerHTML = '<div class="text-danger p-3">[ERROR] Failed to render education</div>';
    }
}

function renderSkillGroups(groups) {
    const pbContainer = document.getElementById('skill-progress-bars');
    const chartLabels = [];
    const chartValues = [];

    const iconMap = {
        'PYTHON': 'fab fa-python', 'SQL': 'fas fa-database', 'POWER BI': 'fas fa-chart-bar',
        'TABLEAU': 'fas fa-chart-pie', 'REACT': 'fab fa-react', 'JAVASCRIPT': 'fab fa-js',
        'ML': 'fas fa-brain', 'EXCEL': 'fas fa-file-excel', 'WEB DEV': 'fas fa-code'
    };

    groups.forEach((group, index) => {
        const groupContainer = document.querySelector(`#skill-group-${index} .skill-chips-container`);
        if (groupContainer) {
            groupContainer.innerHTML = group.skills.map(skill => {
                const icon = iconMap[skill.name.toUpperCase()] || 'fas fa-microchip';
                if (skill.level && chartLabels.length < 6) {
                    chartLabels.push(skill.name);
                    chartValues.push(skill.level);
                }
                return `
                    <div class="skill-pill-tactical">
                        <i class="${icon} text-primary"></i>
                        <span class="font-mono small">${skill.name.toUpperCase()}</span>
                    </div>`;
            }).join('');
        }
    });

    if (window.skillsRadarChart && chartLabels.length > 0) {
        window.skillsRadarChart.data.labels = chartLabels;
        window.skillsRadarChart.data.datasets[0].data = chartValues;
        window.chartBaseData = [...chartValues]; // Retain dynamic baseline for hover effects
        window.skillsRadarChart.update();
    }
}

function renderSkills(data) {
    const chipContainer = document.getElementById('skill-chips');
    if (chipContainer) {
        chipContainer.innerHTML = '';
        data.forEach(item => {
            if (item.Skill) chipContainer.insertAdjacentHTML('beforeend', `<span class="badge border border-primary text-primary m-1">${item.Skill.toUpperCase()}</span>`);
        });
    }
}

function renderProjects(data) {
    const container = document.getElementById('project-list');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(item => {
        const caseStudyHtml = item.caseStudy ? `
            <div class="case-study-details mt-3 pt-3 border-top border-secondary border-opacity-25" style="display: none;" id="case-${item.id}">
                <div class="mb-2"><span class="case-label">Problem:</span> <span class="case-text">${item.caseStudy.problem}</span></div>
                <div class="mb-2"><span class="case-label">Solution:</span> <span class="case-text">${item.caseStudy.solution}</span></div>
            </div>` : '';

        container.insertAdjacentHTML('beforeend', `
          <div class="col-lg-6 project-item" data-category="${item.category || 'all'}">
            <div class="card-glass h-100 project-dossier" id="dossier-${item.id}">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="font-mono small text-primary opacity-50">[DOSSIER_ID: ${item.id || 'PRJ_01'}]</span>
                    ${item.featured ? '<span class="badge badge-featured">FEATURED_OP</span>' : ''}
                </div>
                <h5 class="card-title text-light mb-3 text-uppercase tracking-widest">${item.title}</h5>
                <div class="redaction-container mb-3" onclick="decryptDossier('${item.id}', this)">
                    <p class="card-text redacted-text" id="desc-${item.id}">${item.description.split(' ').map(w => '█'.repeat(w.length)).join(' ')}</p>
                    <div class="redaction-overlay"><span class="decrypt-prompt">DECRYPT_INTEL</span></div>
                </div>
                <div class="d-flex flex-wrap gap-2 mb-4">
                    ${item.technologies ? item.technologies.slice(0, 4).map(t => `<span class="tag-tactical">#${t.toUpperCase()}</span>`).join('') : ''}
                </div>
                ${caseStudyHtml}
                <div class="d-flex gap-2 mt-auto">
                    <a href="${item.liveUrl || '#'}" onclick="openPortfolioBridge(event, '${item.id}')" class="btn btn-sm btn-primary">UPLINK</a>
                    <button class="btn btn-sm btn-outline-primary ms-auto" onclick="decryptDossier('${item.id}', this, true)"><i class="fas fa-sync-alt"></i></button>
                </div>
              </div>
            </div>
          </div>
        `);
    });
}

window.decryptDossier = (id, el, force = false) => {
    const descEl = document.getElementById(`desc-${id}`);
    const dossier = document.getElementById(`dossier-${id}`);
    if (!descEl || (!force && descEl.classList.contains('decrypted'))) return;
    const project = (window.DATA && window.DATA.projects) ? window.DATA.projects.find(p => p.id == id) : null;
    const actualText = project ? project.description : "DATA_RECOVERY_FAILED.";
    if (typeof AudioEngine !== 'undefined') AudioEngine.play('type');
    descEl.classList.add('decrypting');
    dossier.classList.add('scanning');
    let i = 0;
    const interval = setInterval(() => {
        if (i < actualText.length) { descEl.textContent = actualText.substring(0, i) + '█'; i++; }
        else { descEl.textContent = actualText; descEl.classList.remove('decrypting'); descEl.classList.add('decrypted'); dossier.classList.remove('scanning'); clearInterval(interval); if (typeof AudioEngine !== 'undefined') AudioEngine.play('beep'); }
    }, 20);
};

function toggleCaseStudy(id, btn) {
    const el = document.getElementById(`case-${id}`);
    if (el) { el.style.display = el.style.display === 'none' ? 'block' : 'none'; }
}

function renderAwards(data) {
    const container = document.getElementById('awards-list');
    if (!container) return;
    container.innerHTML = data.map(item => `
          <div class="timeline-item"><div class="timeline-dot"></div>
            <div class="resume-item mb-4">
              <h3 class="mb-0">${item.Title}</h3>
              <div class="subheading mb-3 text-primary">${item.Subheading}</div>
            </div>
          </div>`).join('');
}

function initializeProjectFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.onclick = () => {
            const f = btn.getAttribute('data-filter');
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.project-item').forEach(item => {
                const cat = item.getAttribute('data-category');
                item.style.display = (f === 'all' || cat === f) ? 'block' : 'none';
            });
        };
    });
}

function renderBlogs(data) {
    const container = document.getElementById('blog-list');
    if (container) container.innerHTML = data.map(p => `<div class="col-md-4 card-glass p-3 m-2"><h6 class="text-primary">${p.title}</h6><p class="small text-secondary">${p.excerpt}</p></div>`).join('');
}

function renderLearning(data) {
    const container = document.getElementById('learning-list');
    if (container) container.innerHTML = data.map(l => `<div class="col-md-6 mb-2"><span>${l.name}</span><div class="progress" style="height:4px"><div class="progress-bar bg-success" style="width:${l.progress}%"></div></div></div>`).join('');
}

function renderGaming(data) {
    const container = document.getElementById('gaming-stats');
    if (container) container.innerHTML = data.stats.map(s => `<span>${s.label}: ${s.value}</span>`).join(' | ');
}

function renderMedia(data) {
    const container = document.getElementById('media-list') || document.getElementById('favorites-list');
    if (!container || !data) return;

    try {
        container.innerHTML = data.map(item => `
            <div class="media-card card-glass p-3 mb-3">
                <div class="d-flex align-items-center gap-3">
                    <img src="${item.image || '/img/placeholder-media.png'}" 
                         alt="${item.title}" 
                         class="media-thumbnail rounded"
                         style="width: 60px; height: 80px; object-fit: cover;"
                         onerror="this.src='/img/placeholder-media.png'">
                    <div>
                        <h6 class="text-primary mb-1">${item.title}</h6>
                        <span class="badge bg-secondary">${item.subtitle || 'Media'}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('[TACTICAL_DATA] renderMedia error:', err);
        container.innerHTML = '<div class="text-danger p-3">[ERROR] Failed to render media</div>';
    }
}

function renderFileTree(data) {
    const container = document.querySelector('.file-tree-container');
    if (!container) return;
    container.innerHTML = data.map(section => `
        <div class="file-tree-section" id="tree-sec-${section.id}">
            <div class="file-tree-header" onclick="toggleTreeSection('${section.id}')"><span>${section.label}</span></div>
            <div class="file-tree-items" style="display: ${section.isOpen ? 'block' : 'none'}">
                ${section.items.map(item => `<a href="${item.href}" class="file-tree-item" onclick="handleTreeClick(event, '${item.id}')"><span>${item.label}</span></a>`).join('')}
            </div>
        </div>`).join('');
}

async function fetchGithubRepos(username) {
    const container = document.getElementById('githubActivity');
    if (!container) return;
    try {
        const r = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const repos = await r.json();
        container.innerHTML = repos.map(repo => `<div class="p-2 border-bottom border-secondary border-opacity-10"><a href="${repo.html_url}" target="_blank" class="small text-primary">${repo.name.toUpperCase()}</a></div>`).join('');
    } catch (e) { container.innerHTML = 'OFFLINE'; }
}

function initAIChat() {
    if (!document.getElementById('aiChatContainer')) {
        document.body.insertAdjacentHTML('beforeend', `<div class="ai-chat-container card-glass" id="aiChatContainer"><div class="ai-chat-header" onclick="toggleAIChat()">AI_COMMS_V4</div><div class="ai-chat-body" id="aiChatBody"></div><input type="text" id="aiChatInput" onkeypress="if(event.key==='Enter')sendAIMessage()"></div>`);
    }
}

function toggleAIChat() { document.getElementById('aiChatContainer').classList.toggle('active'); }

async function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const msg = input.value.trim();
    if (!msg) return;
    const body = document.getElementById('aiChatBody');
    body.insertAdjacentHTML('beforeend', `<div class="ai-message user">${msg}</div>`);
    input.value = '';

    // Simulated ML/NLP Processing State
    const loadingId = 'loading-' + Date.now();
    body.insertAdjacentHTML('beforeend', `<div class="ai-message system loading" id="${loadingId}">[NLP_PIPELINE] Tokenizing & extracting intents...</div>`);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        const nlpResult = processNLP(msg);

        let responseHtml = `<div class="ai-message bot">`;
        responseHtml += `<div class="text-secondary" style="font-size: 0.55rem; margin-bottom: 6px; border-bottom: 1px solid rgba(34,197,94,0.2); padding-bottom: 4px;">INTENT: ${nlpResult.intent.toUpperCase()} | CONFIDENCE: ${(nlpResult.confidence * 100).toFixed(1)}%</div>`;
        responseHtml += nlpResult.response;
        responseHtml += `</div>`;

        body.insertAdjacentHTML('beforeend', responseHtml);

        if (nlpResult.action) {
            setTimeout(nlpResult.action, 800);
        }
        body.scrollTop = body.scrollHeight;
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('beep');
    }, 1200 + Math.random() * 800); // Simulate dynamic RAG retrieval time
}

function processNLP(text) {
    const normalized = text.toLowerCase().replace(/[^\w\s]/gi, '');
    const words = normalized.split(' ');

    // 1. INTENT CLASSIFICATION (Bag of Words TF-IDF Simulation)
    const intentModels = {
        greeting: ['hi', 'hello', 'hey', 'greetings', 'morning', 'evening'],
        projects: ['project', 'portfolio', 'work', 'build', 'made', 'app', 'dashboard', 'repository'],
        skills: ['skill', 'tech', 'stack', 'tool', 'language', 'know', 'learn', 'python', 'react', 'sql'],
        experience: ['experience', 'job', 'work', 'career', 'role', 'history', 'company', 'employed'],
        contact: ['contact', 'email', 'hire', 'reach', 'message', 'call', 'whatsapp'],
        whoami: ['who', 'about', 'profile', 'background', 'sajid']
    };

    let bestIntent = 'unknown';
    let maxScore = 0;

    for (const [intent, keywords] of Object.entries(intentModels)) {
        let score = 0;
        keywords.forEach(kw => { if (words.includes(kw)) score += 1.5; else if (normalized.includes(kw)) score += 0.5; });
        if (score > maxScore) { maxScore = score; bestIntent = intent; }
    }

    // 2. NAMED ENTITY RECOGNITION (NER) - Match against actual DATA
    let extractedProject = null;
    if (window.DATA && window.DATA.projects) {
        extractedProject = window.DATA.projects.find(p => {
            const titleWords = p.title.toLowerCase().split(' ');
            return titleWords.some(tw => tw.length > 3 && words.includes(tw));
        });
    }

    let response = "I couldn't extract a clear tactical intent. Try asking about 'projects', 'skills', or 'experience'.";
    let action = null;
    let confidence = maxScore > 0 ? Math.min(0.4 + (maxScore * 0.18), 0.99) : 0.12;

    // 3. GENERATIVE RESPONSE ROUTING
    if (extractedProject) {
        bestIntent = 'specific_project';
        confidence = 0.96;
        response = `Vector DB match found: <strong>${extractedProject.title}</strong>.<br><br>${extractedProject.description}<br><br><button class="btn btn-sm btn-outline-primary mt-2" onclick="openPortfolioBridge(event, '${extractedProject.id}')">OPEN DOSSIER</button>`;
    } else {
        switch (bestIntent) {
            case 'greeting':
                response = "Greetings, Operative. How can I assist with your situational awareness of Sajid's portfolio today?";
                break;
            case 'projects':
                response = "Accessing project nodes. Sajid has built extensive BI dashboards and automation tools. Highlighting the grid now.";
                action = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'skills':
                response = "Querying tech stack matrices. Primary proficiencies include Python, Machine Learning, and Data Ops. Routing you to the radar chart.";
                action = () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'experience':
                response = "Retrieving career logs. Notable experience includes strategic operations at Daraz and DEEN Commerce. Scrolling timeline...";
                action = () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                response = "Initializing secure comms channel. You can reach out via encrypted email or direct Signal (WhatsApp).";
                action = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'whoami':
                response = "Sajid Islam is a Data Scientist & Business Analyst specializing in turning complex datasets into strategic growth. Based in Dhaka, Bangladesh.";
                break;
        }
    }
    return { intent: bestIntent, response, action, confidence };
}

// PORTFOLIO BRIDGE (Project Deep Dives HUD)
window.openPortfolioBridge = function (e, projectId) {
    e.preventDefault();
    const project = (window.DATA && window.DATA.projects) ? window.DATA.projects.find(p => p.id === projectId) : null;
    if (!project) return;

    let overlay = document.getElementById('portfolioBridgeOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'portfolioBridgeOverlay';
        overlay.className = 'portfolio-bridge-overlay';
        document.body.appendChild(overlay);
    }

    const caseStudy = project.caseStudy || {};
    const impacts = caseStudy.impact ? caseStudy.impact.map(i => `<li>${i}</li>`).join('') : '<li>Metrics still compiling...</li>';
    const tech = project.technologies ? project.technologies.map(t => `<span class="tag-tactical">#${t}</span>`).join('') : '';

    overlay.innerHTML = `
        <div class="bridge-backdrop" onclick="closePortfolioBridge()"></div>
        <div class="bridge-window">
            <div class="bridge-header">
                <div class="d-flex align-items-center gap-2"><div class="pulse-indicator"></div><span class="bridge-title">[CASE_STUDY: ${project.title}]</span></div>
                <div class="d-flex align-items-center"><span class="telemetry-data d-none d-md-block">STATUS: DECRYPTED</span><button class="btn-bridge-ctrl btn-exit" onclick="closePortfolioBridge()">ABORT</button></div>
            </div>
            <div class="bridge-content p-4 overflow-auto" style="background: var(--bg-page) !important;">
                <div class="row">
                    <div class="col-lg-8">
                        <h2 class="text-primary mb-3">${project.title}</h2>
                        <p class="lead text-secondary">${project.description}</p>
                        <div class="mt-4 p-3 border border-secondary border-opacity-25 bg-dark bg-opacity-25">
                            <h6 class="text-highlight">[MISSION_PROBLEM]</h6><p class="small">${caseStudy.problem || 'N/A'}</p>
                            <h6 class="text-highlight mt-3">[TACTICAL_SOLUTION]</h6><p class="small">${caseStudy.solution || 'N/A'}</p>
                            <h6 class="text-highlight mt-3">[IMPACT_METRICS]</h6><ul class="small text-secondary">${impacts}</ul>
                        </div>
                    </div>
                    <div class="col-lg-4 mt-4 mt-lg-0 border-start border-secondary border-opacity-25">
                        <h6 class="text-primary mb-3">SYSTEM_SPECS</h6>
                        <div class="d-flex flex-wrap gap-2 mb-4">${tech}</div>
                        <div class="d-grid gap-3 mt-4">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt me-2"></i> INITIATE_LIVE_UPLINK</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-secondary"><i class="fab fa-github me-2"></i> VIEW_SOURCE_CODE</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => overlay.classList.add('active'), 10);
};

window.closePortfolioBridge = function () {
    const overlay = document.getElementById('portfolioBridgeOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 400);
    }
}

function toggleTreeSection(id) {
    const el = document.querySelector(`#tree-sec-${id} .file-tree-items`);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function toggleMobileSidebar() { document.getElementById('fileTreeSidebar').classList.toggle('open'); }

function handleTreeClick(e, id) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.substring(1));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', initializeTacticalData);
