/**
 * AI ORACLE - CHAT BOT LOGIC (Secured)
 * Features a reactive, knowledge-based assistant for the portfolio.
 * SECURITY: All API keys are provided via localStorage only.
 */

const userTelemetry = { ip: "UNKNOWN", os: "DETECTION_FAILED" };

async function fetchUserTelemetry() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userTelemetry.ip = data.ip;
    } catch (e) { /* IP fetch bypassed */ }

    const osMatch = navigator.userAgent.match(/\(([^)]+)\)/);
    if (osMatch) userTelemetry.os = osMatch[1];
}

// SECURITY: No default API keys are stored here.
// To enable AI responses, use terminal commands:
//   link_gemini YOUR_GEMINI_KEY
//   link_openai YOUR_OPENAI_KEY
// Keys are stored only in browser localStorage.
const DEFAULT_GEMINI_KEY = null;
const DEFAULT_OPENAI_KEY = null;

// --- MISSION_INTEL_DOSSIER ---
const LOCAL_INTEL = {
    profile: "Sajid Islam. Data Scientist & Business Analyst based in Dhaka. DataOps Lead at DEEN Commerce, ex-Daraz (Alibaba). Expert in strategic growth via BI & ML.",
    experience: [
        "Executive — Business @ DEEN Commerce (Jan 2025 - Present)",
        "Co-Founder @ Gear Master (Jun 2024 - Present)",
        "Marketplace Analyst @ Daraz [Alibaba Group] (Jan 2020 - Jan 2022)"
    ],
    education: [
        "PGD in Data Science & Business Analytics @ ABP (2025)",
        "BSc in Computer Science & Engineering @ North South University (2019)"
    ],
    skills: "Python, SQL, Power BI, Machine Learning, Data Automation, Strategic Business Analysis.",
    projects: "E-Commerce Dashboards, Sheet2WhatsApp, Sentinel Bangladesh, Customer Churn Analysis."
};

const KNOWLEDGE_GROUPS = {
    "hi": { 
        keys: ["hi", "hello", "hey", "greetings", "yo", "u there"], 
        response: () => `Signal Stable. Mission Oracle [LIVE]. I have full dossiers on Sajid's career at Daraz and DEEN Commerce. How can I assist with your intel gathering?` 
    },
    "edu": { 
        keys: ["education", "study", "university", "school", "degree", "acad", "grad", "edu", "qualification"], 
        response: () => `[ACADEMIC_INTEL]: ${LOCAL_INTEL.education.join(' || ')}` 
    },
    "exp": { 
        keys: ["experience", "work", "job", "career", "history", "position", "company", "exp", "past", "track record"], 
        response: () => `[FIELD_REPORTS]: ${LOCAL_INTEL.experience.join(' || ')}` 
    },
    "who": { 
        keys: ["who", "identity", "sajid", "himself", "profile"], 
        response: `[TARGET_PROFILE]: ${LOCAL_INTEL.profile}` 
    },
    "skill": { 
        keys: ["skill", "tech", "stack", "know", "tool", "language", "python", "sql", "powerbi", "tableau"], 
        response: `[TECH_STACK_CORE]: ${LOCAL_INTEL.skills}` 
    },
    "project": { 
        keys: ["project", "work", "featured", "ops", "made", "build", "portfolio"], 
        response: () => `[OPERATIONS_LOG]: ${LOCAL_INTEL.projects}` 
    }
};

// Fuzzy Matching Helper (Levenshtein-ish)
function fuzzyMatch(input, keys) {
    const threshold = 0.7; // Sensitivity
    input = input.toLowerCase();
    for (const key of keys) {
        if (input.includes(key)) return true;
        if (key.length > 3) {
            let matches = 0;
            for(let i=0; i<input.length; i++) {
                if(key.includes(input[i])) matches++;
            }
            if (matches / key.length > threshold) return true;
        }
    }
    return false;
}

let exchangeCount = 0;

export const handleSuggestion = (text) => {
    const input = document.getElementById('aiChatInput');
    if (input) {
        input.value = text;
        const sendBtn = document.getElementById('sendAiMessage');
        if (sendBtn) sendBtn.click();
    }
};

export function initAiChat() {
    const toggle    = document.getElementById('aiChatToggle');
    const container = document.getElementById('aiChatContainer');
    const closeBtn  = document.getElementById('closeAiChat');
    const input     = document.getElementById('aiChatInput');
    const sendBtn   = document.getElementById('sendAiMessage');
    const body      = document.getElementById('aiChatBody');

    if (!toggle || !container) return;

    toggle.addEventListener('click', () => container.classList.toggle('active'));
    if (closeBtn) closeBtn.addEventListener('click', () => container.classList.remove('active'));

    const addMessage = async (text, sender, isSystem = false) => {
        const msg = document.createElement('div');
        msg.className = `ai-message ${sender} ${isSystem ? 'system' : ''}`;
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;

        if (sender === 'bot') {
            await typeWriterEffect(msg, text); // Use typewriter effect for bot messages
            if (typeof AudioEngine !== 'undefined' && AudioEngine.speak) {
                AudioEngine.speak(text);
            }
        } else {
            msg.textContent = text; // Direct text for user and system messages
        }
        body.scrollTop = body.scrollHeight; // Ensure scroll to bottom after message
        return msg;
    };

    async function typeWriterEffect(element, text) {
        let i = 0;
        while (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            body.scrollTop = body.scrollHeight; // Keep scrolling to the bottom
            await new Promise(resolve => setTimeout(resolve, Math.random() * 20 + 30)); // Typing speed
        }
    }

    function showManualFallback() {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'ai-message bot-action d-flex flex-column gap-2';
        btnContainer.innerHTML = `
            <button class="btn-theme-toggle w-100" onclick="window.open('https://wa.me/+8801824526054', '_blank')">
                <i class="fab fa-whatsapp me-2"></i> [HUMAN_COMMAND_UPLINK]
            </button>
        `;
        body.appendChild(btnContainer);
        body.scrollTop = body.scrollHeight;
    }

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';
        exchangeCount++;

        if (exchangeCount > 5) {
            const sug = document.getElementById('aiSuggestions');
            if (sug) sug.style.display = 'none';
        }

        // 1. LOCAL_INTEL_CHECK
        let localResponse = null;
        for (const group in KNOWLEDGE_GROUPS) {
            if (fuzzyMatch(text, KNOWLEDGE_GROUPS[group].keys)) {
                localResponse = typeof KNOWLEDGE_GROUPS[group].response === 'function' ? KNOWLEDGE_GROUPS[group].response() : KNOWLEDGE_GROUPS[group].response;
                break;
            }
        }

        if (localResponse) {
            setTimeout(() => {
                addMessage(localResponse, 'bot');
                if (typeof AudioEngine !== 'undefined') AudioEngine.play('beep');
            }, 400);
            return;
        }

        // 2. MULTI_MODEL_FALLBACK
        const statusMsg = addMessage("[INITIATING_NEURAL_UPLINK]...", 'system');
        statusMsg.classList.add('loading');
        
        const statusInterval = setInterval(() => {
            const lines = ["SIGNAL_PROCESSING...", "ANALYZING_INTEL_STREAMS...", "DECRYPTING_NEURAL_PACKETS..."];
            statusMsg.textContent = lines[Math.floor(Math.random() * lines.length)];
        }, 1500);

        // --- Try Gemini Primary ---
        try {
            const geminiKey = localStorage.getItem('GEMINI_UPLINK_KEY') || DEFAULT_GEMINI_KEY;
            if (!geminiKey) throw new Error("NO_GEMINI_KEY");
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `System Context: You are the AI Oracle for Sajid Islam. Profile: ${LOCAL_INTEL.profile}. Respond tactical/professional hacker tone. Query: ${text}` }] }]
                })
            });
            
            clearInterval(statusInterval);
            if (response.status === 403 || response.status === 429) throw new Error("NEURAL_SYNC_LEVEL_EXCEEDED");
            
            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (aiResponse) {
                statusMsg.remove();
                addMessage(aiResponse, 'bot');
                if (typeof AudioEngine !== 'undefined') AudioEngine.play('beep');
                return;
            }
        } catch (err) { /* Gemini offline, trying OpenAI */ }

        // --- Try OpenAI Secondary ---
        try {
            const oaiKey = localStorage.getItem('OPENAI_UPLINK_KEY') || DEFAULT_OPENAI_KEY;
            if (!oaiKey) throw new Error("NO_OPENAI_KEY");
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${oaiKey}` },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: `Identity: Sajid Islam's AI Oracle. Dossier: ${LOCAL_INTEL.profile}. Tone: Tactical.` },
                        { role: "user", content: text }
                    ]
                })
            });
            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content;
            if (aiResponse) {
                clearInterval(statusInterval);
                statusMsg.remove();
                addMessage(aiResponse, 'bot');
                if (typeof AudioEngine !== 'undefined') AudioEngine.play('beep');
                return;
            }
        } catch (err) { /* OpenAI offline, showing fallback */ }

        clearInterval(statusInterval);
        statusMsg.remove();
        addMessage("[ERROR]: Neural Uplink unstable. Selecting primary contact protocol...", 'system');
        showManualFallback();
    };

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

// Remove duplicate initAiChat from tactical-data.js by not re-defining here

