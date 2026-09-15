import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const MODES = [
    { id: 'mobile', label: 'Mobile Simulator', icon: '📱', tag: 'Flutter & Kotlin', color: 'text-mint', border: 'border-mint/30', bg: 'bg-mint/10' },
    { id: 'web', label: 'Web Simulator', icon: '💻', tag: 'React & Node.js', color: 'text-accent', border: 'border-accent/30', bg: 'bg-accent/10' },
    { id: 'ai', label: 'AI Neural Lab', icon: '🤖', tag: 'LLMs & AI Agents', color: 'text-violet', border: 'border-violet/30', bg: 'bg-violet/10' },
];

const MOBILE_APPS = [
    {
        id: 'exam-master',
        title: 'Exam Master App',
        subtitle: '50k+ MCQs Prep Platform',
        playStoreUrl: 'https://play.google.com/store',
        github: 'https://github.com',
        badge: 'Play Store Live',
        score: '88% Score · 1,420 Users',
        question: 'What is the primary rendering engine architecture in Flutter?',
        options: [
            { text: 'A) Impeller & Skia', correct: true },
            { text: 'B) WebKit Engine', correct: false },
            { text: 'C) JavaScript Bridge', correct: false },
            { text: 'D) Native OEM Views', correct: false },
        ],
    },
    {
        id: 'qau-gpa',
        title: 'QAU GPA Calculator',
        subtitle: 'University Academic Engine',
        playStoreUrl: 'https://play.google.com/store',
        github: 'https://github.com',
        badge: 'Featured Student Tool',
        score: 'CGPA: 3.84 / 4.00',
        courses: [
            { name: 'Advanced Algorithms', grade: 'A', gpa: '4.0', cr: 3 },
            { name: 'Distributed Systems', grade: 'A-', gpa: '3.7', cr: 3 },
            { name: 'Mobile Application Dev', grade: 'A', gpa: '4.0', cr: 4 },
        ],
    },
    {
        id: 'news-aggregator',
        title: 'News Aggregator App',
        subtitle: 'Real-Time News Engine',
        playStoreUrl: 'https://play.google.com/store',
        github: 'https://github.com',
        badge: 'Realtime Feed',
        headline: 'AI-driven compilation delivers 3x faster client-side rendering.',
        category: 'Technology & AI',
        time: '12m ago · 4.2k reads',
    },
];

const WEB_APPS = [
    {
        id: 'chat-app',
        title: 'Real-Time Chat Platform',
        url: 'https://chat.faheem.dev/general',
        demo: 'https://chatapp.example.com',
        github: 'https://github.com',
        messages: [
            { sender: 'Client', text: 'Can we integrate real-time typing indicators and offline cache?', time: '10:42 AM' },
            { sender: 'Faheem', text: 'Already configured with Firebase Realtime sync and optimistic UI updates.', time: '10:43 AM', isMe: true },
            { sender: 'Client', text: 'Latency is blazing fast, under 50ms!', time: '10:44 AM' },
        ],
    },
    {
        id: 'event-manager',
        title: 'Event Management Platform',
        url: 'https://events.faheem.dev/dashboard',
        demo: 'https://eventmanager.example.com',
        github: 'https://github.com',
        stats: [
            { label: 'Active Bookings', value: '142' },
            { label: 'Revenue Generated', value: '$28,450' },
            { label: 'Vendor Rating', value: '4.9 ★' },
        ],
    },
];

const AI_PROMPTS = [
    {
        title: 'Legal Contract Risk Evaluation',
        prompt: 'Analyze high-risk liability and termination clauses in commercial SaaS agreement.',
        response: 'Identified 2 critical risk clauses: Uncapped indemnification in Sec 9.2 and unilateral IP transfer without cure period. Recommended reciprocal limitation capped at 12-month fees.',
        confidence: '99.4% Accuracy',
        latency: '148ms',
    },
    {
        title: 'Statutory Case Precedent Lookup',
        prompt: 'Retrieve leading case law precedents on software copyright vs trade secret protection.',
        response: 'Retrieved 4 binding precedents affirming copyright protects literal code, while trade secret doctrine shields algorithmic proprietary logic. Full legal roadmap compiled.',
        confidence: '98.8% Accuracy',
        latency: '162ms',
    },
    {
        title: 'Automated Regulatory Roadmap',
        prompt: 'Generate compliance requirements for cross-border mobile data storage under GDPR & local regulations.',
        response: 'Compliance Checklist: 1) End-to-end AES-256 encryption, 2) In-region server routing for sensitive PII, 3) Automated 30-day deletion pipeline with audit logging.',
        confidence: '99.7% Accuracy',
        latency: '135ms',
    },
];

const InteractiveSimulator = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);
    const [activeMode, setActiveMode] = useState('mobile');

    // Sub-states
    const [activeMobileAppIndex, setActiveMobileAppIndex] = useState(0);
    const [selectedQuizOption, setSelectedQuizOption] = useState(0);
    const [activeWebAppIndex, setActiveWebAppIndex] = useState(0);
    const [activeAiPromptIndex, setActiveAiPromptIndex] = useState(0);

    const activeMobileApp = MOBILE_APPS[activeMobileAppIndex];
    const activeWebApp = WEB_APPS[activeWebAppIndex];
    const activeAiPrompt = AI_PROMPTS[activeAiPromptIndex];

    return (
        <section id="simulator" className="py-20 sm:py-24 relative overflow-hidden">
            {/* Ambient backdrop glow based on mode */}
            <div
                className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-[130px] transition-colors duration-700 ${
                    activeMode === 'mobile' ? 'bg-mint/10' : activeMode === 'web' ? 'bg-accent/10' : 'bg-violet/15'
                }`}
            />

            <div className="section-shell">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="eyebrow">
                            <span className="pulse-glow inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                            Live Product Lab
                        </span>
                        <h2 className="section-title mt-4 sm:mt-5 text-center">
                            Interact with my work in<br />
                            <span className="shimmer-text">real device environments.</span>
                        </h2>
                        <p className="section-subtitle mx-auto mt-3 sm:mt-4 max-w-xl px-2">
                            Toggle between Smartphone, Desktop Web, and AI Neural Lab simulators to test live functionality.
                        </p>

                        {/* 3 Main Mode Selectors */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                            {MODES.map((mode) => (
                                <button
                                    key={mode.id}
                                    type="button"
                                    onClick={() => setActiveMode(mode.id)}
                                    className={`relative flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                        activeMode === mode.id
                                            ? `${mode.bg} ${mode.border} ${mode.color} shadow-glow-brand scale-102`
                                            : 'bg-white/4 border-white/8 text-[#7b97ae] hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    <span className="text-base sm:text-lg">{mode.icon}</span>
                                    <span>{mode.label}</span>
                                    <span className="hidden sm:inline-block text-[10px] opacity-70 border-l border-white/15 pl-2 font-normal">
                                        {mode.tag}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Simulator Stage */}
                    <div className="relative mx-auto flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {/* MODE 1: SMARTPHONE SIMULATOR */}
                            {activeMode === 'mobile' && (
                                <motion.div
                                    key="mobile-simulator"
                                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full max-w-[360px] sm:max-w-[390px] flex flex-col items-center"
                                >
                                    {/* App switch bar above phone */}
                                    <div className="mb-4 flex items-center gap-2 w-full justify-center">
                                        {MOBILE_APPS.map((app, idx) => (
                                            <button
                                                key={app.id}
                                                type="button"
                                                onClick={() => setActiveMobileAppIndex(idx)}
                                                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                                                    activeMobileAppIndex === idx
                                                        ? 'bg-mint text-[#050c12] font-bold shadow-sm'
                                                        : 'bg-white/6 text-[#7b97ae] hover:bg-white/10 hover:text-white'
                                                }`}
                                            >
                                                {app.title.split(' ')[0]}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Realistic Smartphone Shell */}
                                    <div className="relative w-full rounded-[2.75rem] border-[5px] border-[#1e3247] bg-[#070f17] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,217,169,0.15)] overflow-hidden p-3.5 pt-2">
                                        {/* Phone Speaker & Dynamic Island */}
                                        <div className="mx-auto flex h-6 w-28 items-center justify-center rounded-full bg-[#050c12] border border-white/10 shadow-inner mb-3">
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#0a1824] border border-white/10 mr-2" />
                                            <span className="h-1.5 w-6 rounded-full bg-white/10" />
                                        </div>

                                        {/* Status Bar */}
                                        <div className="flex items-center justify-between px-3 text-[10px] font-semibold text-slate-400 mb-3">
                                            <span>9:41</span>
                                            <div className="flex items-center gap-1.5">
                                                <span>5G</span>
                                                <div className="h-2 w-4 rounded-sm border border-slate-400 p-0.5">
                                                    <div className="h-full w-full bg-mint rounded-2xs" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Screen Canvas */}
                                        <div className="rounded-[1.75rem] bg-gradient-to-b from-[#0e1b29] to-[#070f17] border border-white/8 p-4 min-h-[440px] flex flex-col justify-between">
                                            <div>
                                                {/* App Header Inside Phone */}
                                                <div className="flex items-center justify-between pb-3 border-b border-white/8">
                                                    <div>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider text-mint">{activeMobileApp.badge}</span>
                                                        <h4 className="font-display text-sm font-bold text-white">{activeMobileApp.title}</h4>
                                                    </div>
                                                    <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[9px] font-bold text-mint">Flutter Engine</span>
                                                </div>

                                                {/* App Content Preview */}
                                                <div className="mt-4">
                                                    {activeMobileApp.id === 'exam-master' && (
                                                        <div className="space-y-3">
                                                            <div className="rounded-xl bg-white/4 p-3 border border-white/6">
                                                                <span className="text-[10px] text-[#7b97ae]">Live Practice Question #42</span>
                                                                <p className="mt-1 text-xs font-semibold text-white leading-relaxed">
                                                                    {activeMobileApp.question}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                {activeMobileApp.options.map((opt, i) => (
                                                                    <button
                                                                        key={opt.text}
                                                                        type="button"
                                                                        onClick={() => setSelectedQuizOption(i)}
                                                                        className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                                                                            selectedQuizOption === i
                                                                                ? opt.correct
                                                                                    ? 'bg-mint/20 border border-mint text-white'
                                                                                    : 'bg-red-500/20 border border-red-400 text-white'
                                                                                : 'bg-white/4 border border-white/6 text-slate-300 hover:bg-white/8'
                                                                        }`}
                                                                    >
                                                                        <span>{opt.text}</span>
                                                                        {selectedQuizOption === i && (
                                                                            <span>{opt.correct ? '✓ Correct' : '✕ Try Again'}</span>
                                                                        )}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeMobileApp.id === 'qau-gpa' && (
                                                        <div className="space-y-3">
                                                            <div className="rounded-xl bg-gradient-to-r from-mint/15 to-accent/15 p-3.5 border border-mint/25 text-center">
                                                                <span className="text-[10px] uppercase tracking-wider text-[#7b97ae]">Semester SGPA Analysis</span>
                                                                <p className="text-2xl font-bold font-display text-white mt-1">{activeMobileApp.score}</p>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                {activeMobileApp.courses.map((course) => (
                                                                    <div key={course.name} className="flex items-center justify-between p-2 rounded-lg bg-white/4 border border-white/6 text-xs">
                                                                        <span className="font-medium text-slate-200 truncate pr-2">{course.name}</span>
                                                                        <span className="font-bold text-mint shrink-0">{course.grade} ({course.gpa})</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeMobileApp.id === 'news-aggregator' && (
                                                        <div className="space-y-3">
                                                            <div className="rounded-xl bg-white/4 border border-white/6 p-3">
                                                                <span className="text-[9px] font-bold uppercase tracking-wider text-accent">{activeMobileApp.category}</span>
                                                                <h5 className="text-xs font-bold text-white mt-1 leading-snug">{activeMobileApp.headline}</h5>
                                                                <p className="text-[10px] text-[#7b97ae] mt-2">{activeMobileApp.time}</p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                {['Trending', 'Tech', 'AI', 'Global'].map((tab, i) => (
                                                                    <span key={tab} className={`px-2 py-1 rounded text-[10px] font-medium ${i === 0 ? 'bg-mint/20 text-mint border border-mint/30' : 'bg-white/4 text-slate-400'}`}>
                                                                        {tab}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Bar Inside Phone */}
                                            <div className="pt-3 border-t border-white/8 flex items-center gap-2">
                                                {activeMobileApp.playStoreUrl && (
                                                    <a
                                                        href={activeMobileApp.playStoreUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-playstore flex-1 py-2 text-[11px] justify-center"
                                                    >
                                                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5C3.5 20.83 3 20.5 3 20.5z" />
                                                        </svg>
                                                        Play Store
                                                    </a>
                                                )}
                                                <a
                                                    href={activeMobileApp.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-github flex-1 py-2 text-[11px] justify-center"
                                                >
                                                    View Code
                                                </a>
                                            </div>
                                        </div>

                                        {/* Home Indicator Bar */}
                                        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-white/20" />
                                    </div>
                                </motion.div>
                            )}

                            {/* MODE 2: DESKTOP WEB SIMULATOR */}
                            {activeMode === 'web' && (
                                <motion.div
                                    key="web-simulator"
                                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full max-w-[660px]"
                                >
                                    {/* App switch tabs */}
                                    <div className="mb-4 flex items-center justify-center gap-2">
                                        {WEB_APPS.map((app, idx) => (
                                            <button
                                                key={app.id}
                                                type="button"
                                                onClick={() => setActiveWebAppIndex(idx)}
                                                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                                    activeWebAppIndex === idx
                                                        ? 'bg-accent text-white font-bold shadow-sm'
                                                        : 'bg-white/6 text-[#7b97ae] hover:bg-white/10 hover:text-white'
                                                }`}
                                            >
                                                {app.title}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Realistic MacBook / Safari Window Frame */}
                                    <div className="rounded-2xl border border-white/12 bg-[#0a1520] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(255,122,24,0.12)] overflow-hidden">
                                        {/* Browser Chrome Header */}
                                        <div className="flex items-center justify-between px-4 py-3 bg-[#0e1c2a] border-b border-white/8">
                                            {/* Window traffic lights */}
                                            <div className="flex items-center gap-1.5">
                                                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                                                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                                                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                                            </div>

                                            {/* URL Bar */}
                                            <div className="flex items-center gap-2 rounded-lg bg-[#070f17] border border-white/8 px-3 py-1 text-[11px] text-slate-300 w-3/5 truncate">
                                                <svg className="h-3 w-3 text-mint shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                <span className="truncate">{activeWebApp.url}</span>
                                            </div>

                                            <span className="text-[10px] font-bold text-accent">React + Node</span>
                                        </div>

                                        {/* Web App Viewport */}
                                        <div className="p-5 min-h-[340px] bg-gradient-to-b from-[#08131e] to-[#050c12] flex flex-col justify-between">
                                            {activeWebApp.id === 'chat-app' && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between pb-3 border-b border-white/8">
                                                        <div className="flex items-center gap-2">
                                                            <span className="h-2 w-2 rounded-full bg-mint" />
                                                            <span className="text-xs font-bold text-white">#engineering-team</span>
                                                        </div>
                                                        <span className="text-[10px] text-[#7b97ae]">Firebase Realtime Channel</span>
                                                    </div>

                                                    <div className="space-y-2.5">
                                                        {activeWebApp.messages.map((msg, i) => (
                                                            <div
                                                                key={i}
                                                                className={`p-3 rounded-xl max-w-[85%] text-xs ${
                                                                    msg.isMe
                                                                        ? 'ml-auto bg-accent/20 border border-accent/30 text-white'
                                                                        : 'bg-white/4 border border-white/6 text-slate-300'
                                                                }`}
                                                            >
                                                                <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-[#7b97ae]">
                                                                    <span className="font-bold text-white">{msg.sender}</span>
                                                                    <span>{msg.time}</span>
                                                                </div>
                                                                <p>{msg.text}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center gap-2 pt-2">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                                                        <span className="text-[10px] text-mint">faheem is typing with optimistic local cache...</span>
                                                    </div>
                                                </div>
                                            )}

                                            {activeWebApp.id === 'event-manager' && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between pb-3 border-b border-white/8">
                                                        <span className="text-xs font-bold text-white">Platform Overview & Metrics</span>
                                                        <span className="text-[10px] text-accent">Stripe & MongoDB Engine</span>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-3">
                                                        {activeWebApp.stats.map((stat) => (
                                                            <div key={stat.label} className="p-3 rounded-xl bg-white/4 border border-white/6 text-center">
                                                                <p className="text-lg font-bold font-display text-white">{stat.value}</p>
                                                                <p className="text-[10px] text-[#7b97ae] mt-1">{stat.label}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="p-3.5 rounded-xl bg-white/4 border border-white/6 text-xs text-slate-300">
                                                        <div className="flex justify-between items-center mb-1.5">
                                                            <span className="font-semibold text-white">Event Scheduling Pipeline</span>
                                                            <span className="text-mint font-bold text-[11px]">99.9% Uptime</span>
                                                        </div>
                                                        <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
                                                            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-mint" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action bar inside browser */}
                                            <div className="mt-5 pt-3 border-t border-white/8 flex items-center justify-end gap-3">
                                                <a
                                                    href={activeWebApp.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary text-xs py-2 px-5"
                                                >
                                                    Open Live Web App
                                                </a>
                                                <a
                                                    href={activeWebApp.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-github text-xs py-2 px-4"
                                                >
                                                    Repository
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* MODE 3: AI NEURAL LAB INTERFACE */}
                            {activeMode === 'ai' && (
                                <motion.div
                                    key="ai-simulator"
                                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full max-w-[660px]"
                                >
                                    {/* AI Terminal Frame */}
                                    <div className="rounded-2xl border border-violet/30 bg-[#0c0919] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(155,127,232,0.18)] overflow-hidden">
                                        {/* AI HUD Header */}
                                        <div className="flex items-center justify-between px-4 py-3 bg-[#130e26] border-b border-violet/20">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2.5 w-2.5 rounded-full bg-violet animate-pulse" />
                                                <span className="text-xs font-mono font-bold text-white">AI Lawyer & Intelligent Assistant</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-md bg-violet/20 border border-violet/30 px-2 py-0.5 text-[10px] font-mono text-violet">
                                                    OpenAI GPT-4o
                                                </span>
                                                <span className="text-[10px] font-mono text-mint">{activeAiPrompt.latency}</span>
                                            </div>
                                        </div>

                                        {/* Interactive Prompts Selectors */}
                                        <div className="p-4 border-b border-violet/15 bg-white/2">
                                            <p className="text-[10px] font-mono uppercase tracking-widest text-violet mb-2">Select Live AI Test Case:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {AI_PROMPTS.map((item, idx) => (
                                                    <button
                                                        key={item.title}
                                                        type="button"
                                                        onClick={() => setActiveAiPromptIndex(idx)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition cursor-pointer ${
                                                            activeAiPromptIndex === idx
                                                                ? 'bg-violet text-white font-bold shadow-md'
                                                                : 'bg-white/5 border border-white/8 text-slate-300 hover:bg-white/10'
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* AI Stream Simulation Viewport */}
                                        <div className="p-5 min-h-[280px] bg-[#070510] space-y-4 font-mono">
                                            {/* User Input Query */}
                                            <div className="rounded-xl border border-white/8 bg-white/4 p-3.5">
                                                <div className="flex items-center gap-2 text-[10px] text-violet mb-1">
                                                    <span>&gt; Input Prompt:</span>
                                                </div>
                                                <p className="text-xs text-white leading-relaxed">{activeAiPrompt.prompt}</p>
                                            </div>

                                            {/* Streaming Response */}
                                            <div className="rounded-xl border border-violet/30 bg-violet/8 p-4">
                                                <div className="flex items-center justify-between gap-2 text-[10px] text-mint mb-2">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="h-2 w-2 rounded-full bg-mint" />
                                                        Synthesized Model Output
                                                    </span>
                                                    <span>{activeAiPrompt.confidence}</span>
                                                </div>
                                                <p className="text-xs text-slate-200 leading-relaxed font-sans">{activeAiPrompt.response}</p>
                                            </div>
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="p-4 bg-[#110c22] border-t border-violet/20 flex items-center justify-between">
                                            <span className="text-[11px] font-mono text-[#7b97ae]">Integrated in Production Client Systems</span>
                                            <a
                                                href="https://ailawyer.example.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary text-xs py-2 px-5"
                                                style={{ background: 'linear-gradient(135deg, #7c5cbf, #9b7fe8)' }}
                                            >
                                                Launch Full AI App
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveSimulator;
