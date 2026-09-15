import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarIntroAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState('entering'); // 'entering' -> 'stopped' -> 'accelerating' -> 'done'
    const [timeLeft, setTimeLeft] = useState(4.8);

    useEffect(() => {
        // Timeline transitions
        const t1 = setTimeout(() => setPhase('stopped'), 1100);
        const t2 = setTimeout(() => setPhase('accelerating'), 3700);
        const t3 = setTimeout(() => {
            setPhase('done');
            if (onComplete) onComplete();
        }, 4600);

        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, +(prev - 0.1).toFixed(1)));
        }, 100);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearInterval(interval);
        };
    }, [onComplete]);

    const handleSkip = () => {
        setPhase('done');
        if (onComplete) onComplete();
    };

    if (phase === 'done') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                className="fixed inset-0 z-[9999] flex flex-col items-center justify-between overflow-hidden bg-[#04080e] select-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 40%, #0a1727 0%, #04080e 75%, #020408 100%)',
                }}
            >
                {/* Skip Button (Top-Right) */}
                <div className="w-full flex justify-between items-center px-6 py-5 z-20">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                        <span className="text-[11px] font-mono tracking-widest text-[#7b97ae] uppercase">
                            Ignition · System Ready
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleSkip}
                        className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition cursor-pointer"
                    >
                        <span>Skip Intro</span>
                        <span className="text-[10px] text-accent font-bold">({Math.ceil(timeLeft)}s)</span>
                        <svg className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Cyber Grid Background Perspective */}
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(56, 217, 169, 0.08) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255, 122, 24, 0.08) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                        }}
                    />
                </div>

                {/* Animated Speed Lines (Only during entering & accelerating) */}
                {(phase === 'entering' || phase === 'accelerating') && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                        {[15, 30, 48, 65, 82].map((top, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ x: '100vw', opacity: 0 }}
                                animate={{ x: '-100vw', opacity: [0, 0.8, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: phase === 'accelerating' ? 0.35 : 0.65,
                                    delay: idx * 0.08,
                                    ease: 'linear',
                                }}
                                className="absolute h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-48 sm:w-96"
                                style={{ top: `${top}%` }}
                            />
                        ))}
                    </div>
                )}

                {/* Central Stage: Holographic Message + Sports Car */}
                <div className="relative w-full max-w-4xl flex-1 flex flex-col items-center justify-center px-4 z-10">

                    {/* Holographic Message Card (Appears when car stops) */}
                    <AnimatePresence>
                        {phase === 'stopped' && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -30, scale: 0.85, transition: { duration: 0.3 } }}
                                transition={{ duration: 0.45, ease: 'easeOut' }}
                                className="w-full max-w-xl mx-auto mb-6 p-5 sm:p-6 rounded-2xl bg-[#07121e]/90 border border-cyan-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(56,217,169,0.2)] backdrop-blur-md text-center relative overflow-hidden"
                            >
                                {/* Top Holographic Scanner Line */}
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                />

                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-bold mb-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Portfolio Engine Initialized
                                </span>

                                <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white tracking-tight">
                                    Muhammad Faheem Khan
                                </h1>

                                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                                    Engineering High-Impact Products across 3 Horizons
                                </p>

                                {/* 3 Core Domains: Mobile · Web · AI */}
                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mint/10 border border-mint/30 text-xs font-semibold text-mint"
                                    >
                                        <span className="text-sm">📱</span>
                                        <span>Mobile Apps</span>
                                        <span className="text-[10px] text-slate-400">(Flutter / Kotlin)</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.28 }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/30 text-xs font-semibold text-accent"
                                    >
                                        <span className="text-sm">💻</span>
                                        <span>Full-Stack Web</span>
                                        <span className="text-[10px] text-slate-400">(MERN / React)</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet/15 border border-violet/35 text-xs font-semibold text-violet"
                                    >
                                        <span className="text-sm">🤖</span>
                                        <span>AI Systems</span>
                                        <span className="text-[10px] text-slate-400">(Fleet AI / LLMs)</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Car Stage Container */}
                    <div className="relative w-full flex items-center justify-center">
                        <motion.div
                            initial={{ x: '-120vw', scale: 0.88 }}
                            animate={
                                phase === 'entering'
                                    ? { x: 0, scale: 1 }
                                    : phase === 'stopped'
                                    ? { x: 0, scale: 1, y: [0, -2, 0] }
                                    : phase === 'accelerating'
                                    ? { x: '130vw', scale: 1.08 }
                                    : { x: '130vw' }
                            }
                            transition={
                                phase === 'entering'
                                    ? { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
                                    : phase === 'stopped'
                                    ? { y: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } }
                                    : phase === 'accelerating'
                                    ? { duration: 0.85, ease: [0.7, 0, 0.84, 0] }
                                    : { duration: 0.5 }
                            }
                            className="relative flex flex-col items-center"
                        >
                            {/* Headlights High-Beam Cones (Shooting Right) */}
                            <div className="pointer-events-none absolute left-[78%] top-[42%] -translate-y-1/2 w-64 sm:w-96 h-28 sm:h-36 overflow-hidden z-0">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.85) 0%, rgba(56, 217, 169, 0.45) 30%, rgba(56, 217, 169, 0.08) 70%, transparent 100%)',
                                        clipPath: 'polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)',
                                        filter: 'blur(2px)',
                                    }}
                                />
                            </div>

                            {/* Nitro Thruster Trail (Behind car when accelerating) */}
                            {phase === 'accelerating' && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 220, opacity: 1 }}
                                    className="pointer-events-none absolute right-[95%] top-[55%] -translate-y-1/2 h-10 bg-gradient-to-l from-cyan-400 via-orange-500 to-transparent blur-sm rounded-full z-0"
                                />
                            )}

                            {/* Neon Underglow Floor Light */}
                            <div className="absolute -bottom-3 w-4/5 h-8 bg-cyan-400/35 rounded-full blur-xl -z-10" />

                            {/* Sleek High-Tech Sports Car Vector */}
                            <div className="w-[310px] sm:w-[460px] md:w-[540px] relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">
                                <svg
                                    viewBox="0 0 540 180"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-auto"
                                >
                                    <defs>
                                        {/* Gradients */}
                                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#0c1825" />
                                            <stop offset="40%" stopColor="#152b42" />
                                            <stop offset="70%" stopColor="#1e3d5f" />
                                            <stop offset="100%" stopColor="#112235" />
                                        </linearGradient>
                                        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#0a1520" />
                                            <stop offset="100%" stopColor="#050a10" />
                                        </linearGradient>
                                        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6" />
                                            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#050b14" stopOpacity="0.9" />
                                        </linearGradient>
                                        <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#38d9a9" />
                                            <stop offset="100%" stopColor="#00f0ff" />
                                        </linearGradient>
                                        <linearGradient id="neonAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ff7a18" />
                                            <stop offset="100%" stopColor="#ff4d4d" />
                                        </linearGradient>
                                    </defs>

                                    {/* Car Body Shell (Aerodynamic silhouette facing right) */}
                                    {/* Rear wing spoiler */}
                                    <path d="M40 70 L65 72 L60 82 L35 80 Z" fill="#0c1825" stroke="#38d9a9" strokeWidth="1.5" />
                                    <rect x="52" y="80" width="6" height="15" fill="#152b42" />

                                    {/* Main Body */}
                                    <path
                                        d="M45 92 
                                           C60 90, 85 88, 120 86 
                                           C160 52, 230 42, 330 46 
                                           C380 50, 420 72, 475 92 
                                           C505 102, 530 114, 532 124 
                                           C533 132, 515 136, 480 136 
                                           L455 136 
                                           C450 115, 410 115, 395 136 
                                           L195 136 
                                           C190 115, 150 115, 135 136 
                                           L55 136 
                                           C42 136, 38 126, 40 115 
                                           Z"
                                        fill="url(#bodyGrad)"
                                        stroke="#2a4b6c"
                                        strokeWidth="2"
                                    />

                                    {/* Aerodynamic side intake scoop */}
                                    <path d="M210 102 C235 100, 270 100, 285 106 L280 118 C265 116, 230 116, 215 118 Z" fill="#08101a" stroke="#38d9a9" strokeWidth="1" opacity="0.8" />

                                    {/* Cockpit / Glass Canopy */}
                                    <path
                                        d="M165 82 
                                           C190 56, 240 48, 315 50 
                                           C360 52, 395 68, 425 82 
                                           L375 83 
                                           L290 83 
                                           Z"
                                        fill="url(#glassGrad)"
                                        stroke="#00f0ff"
                                        strokeWidth="1.5"
                                    />

                                    {/* Windshield Pillar & Driver silhouette */}
                                    <path d="M315 51 L335 82" stroke="#152b42" strokeWidth="3" />
                                    <circle cx="280" cy="70" r="8" fill="#1e3d5f" opacity="0.7" />

                                    {/* Futuristic Cyber Headlight (Xenon LED) */}
                                    <polygon points="485,96 528,112 515,120 480,105" fill="#ffffff" filter="drop-shadow(0 0 8px #00f0ff)" />
                                    <line x1="482" y1="99" x2="525" y2="114" stroke="#00f0ff" strokeWidth="2.5" />

                                    {/* Front Bumper Splitter with Neon Accent */}
                                    <path d="M480 134 L535 130 L532 138 L475 140 Z" fill="url(#neonAccent)" />

                                    {/* Rear Tail Light Strip */}
                                    <path d="M38 102 L48 104 L46 114 L36 112 Z" fill="#ff3344" filter="drop-shadow(0 0 6px #ff2233)" />

                                    {/* Underbody Neon Trim Line */}
                                    <path d="M195 136 L395 136" stroke="url(#neonCyan)" strokeWidth="3" strokeLinecap="round" />

                                    {/* REAR WHEEL (Animated spinning rims) */}
                                    <g transform="translate(165, 136)">
                                        {/* Tire Rubber */}
                                        <circle cx="0" cy="0" r="30" fill="#0a121c" stroke="#1b2a3a" strokeWidth="4" />
                                        {/* Neon Outer Rim */}
                                        <circle cx="0" cy="0" r="23" fill="#0e1b29" stroke="#38d9a9" strokeWidth="2" />
                                        {/* Spokes (Spinning) */}
                                        <g className={phase !== 'stopped' ? 'animate-spin' : ''} style={{ transformOrigin: '0 0', animationDuration: phase === 'accelerating' ? '0.2s' : '0.5s' }}>
                                            <line x1="-18" y1="0" x2="18" y2="0" stroke="#00f0ff" strokeWidth="2.5" />
                                            <line x1="0" y1="-18" x2="0" y2="18" stroke="#00f0ff" strokeWidth="2.5" />
                                            <line x1="-13" y1="-13" x2="13" y2="13" stroke="#ff7a18" strokeWidth="2" />
                                            <line x1="-13" y1="13" x2="13" y2="-13" stroke="#ff7a18" strokeWidth="2" />
                                        </g>
                                        <circle cx="0" cy="0" r="7" fill="#ffffff" />
                                    </g>

                                    {/* FRONT WHEEL (Animated spinning rims) */}
                                    <g transform="translate(425, 136)">
                                        {/* Tire Rubber */}
                                        <circle cx="0" cy="0" r="30" fill="#0a121c" stroke="#1b2a3a" strokeWidth="4" />
                                        {/* Neon Outer Rim */}
                                        <circle cx="0" cy="0" r="23" fill="#0e1b29" stroke="#38d9a9" strokeWidth="2" />
                                        {/* Spokes (Spinning) */}
                                        <g className={phase !== 'stopped' ? 'animate-spin' : ''} style={{ transformOrigin: '0 0', animationDuration: phase === 'accelerating' ? '0.2s' : '0.5s' }}>
                                            <line x1="-18" y1="0" x2="18" y2="0" stroke="#00f0ff" strokeWidth="2.5" />
                                            <line x1="0" y1="-18" x2="0" y2="18" stroke="#00f0ff" strokeWidth="2.5" />
                                            <line x1="-13" y1="-13" x2="13" y2="13" stroke="#ff7a18" strokeWidth="2" />
                                            <line x1="-13" y1="13" x2="13" y2="-13" stroke="#ff7a18" strokeWidth="2" />
                                        </g>
                                        <circle cx="0" cy="0" r="7" fill="#ffffff" />
                                    </g>
                                </svg>
                            </div>
                        </motion.div>
                    </div>

                    {/* Asphalt Road with Speed Lines */}
                    <div className="w-full max-w-2xl mt-1 relative">
                        {/* Road Surface */}
                        <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                        
                        {/* Moving Road Markers */}
                        <div className="relative h-2 w-full overflow-hidden mt-1 flex justify-center">
                            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 120 }}
                                    animate={
                                        phase !== 'stopped'
                                            ? { x: -280 }
                                            : { x: 0 }
                                    }
                                    transition={
                                        phase !== 'stopped'
                                            ? { repeat: Infinity, duration: phase === 'accelerating' ? 0.25 : 0.45, ease: 'linear' }
                                            : { duration: 0 }
                                    }
                                    className="inline-block mx-4 h-[2px] w-12 bg-cyan-400/50 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Status / Tech Bar */}
                <div className="w-full py-4 px-6 flex items-center justify-between z-20 border-t border-white/5 text-[11px] font-mono text-[#7b97ae]">
                    <div className="flex items-center gap-3">
                        <span className="text-white font-bold">MFK ENGINE v2.6</span>
                        <span className="hidden sm:inline-block text-slate-500">|</span>
                        <span className="hidden sm:inline-block text-mint">3 HORIZONS: MOBILE • WEB • AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                        <span className="text-slate-300">
                            {phase === 'entering' && 'Arriving at Terminal...'}
                            {phase === 'stopped' && 'Welcome Protocol Active'}
                            {phase === 'accelerating' && 'Nitro Launching Portfolio...'}
                        </span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CarIntroAnimation;
