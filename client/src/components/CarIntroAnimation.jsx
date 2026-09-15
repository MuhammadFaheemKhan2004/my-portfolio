import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarIntroAnimation = ({ onComplete }) => {
    // Phases: 'entering' -> 'stopped' -> 'accelerating' -> 'done'
    const [phase, setPhase] = useState('entering');

    useEffect(() => {
        // Timing sequence:
        // 0.0s - 1.2s: Drives in from offscreen left to center
        // 1.2s - 3.8s: Stops in center, message bubble pops open
        // 3.8s - 4.8s: Accelerates rapidly to the right and disappears
        // 4.9s: Unmounts
        const t1 = setTimeout(() => setPhase('stopped'), 1200);
        const t2 = setTimeout(() => setPhase('accelerating'), 4200);
        const t3 = setTimeout(() => {
            setPhase('done');
            if (onComplete) onComplete();
        }, 5000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    const handleDismiss = () => {
        setPhase('done');
        if (onComplete) onComplete();
    };

    if (phase === 'done') return null;

    return (
        <div
            className="fixed inset-x-0 bottom-4 sm:bottom-8 z-[100] pointer-events-none flex flex-col items-center justify-end overflow-hidden"
            aria-live="polite"
        >
            {/* CAR + MESSAGE RIG */}
            <motion.div
                initial={{ x: '-110vw' }}
                animate={
                    phase === 'entering'
                        ? { x: 0 }
                        : phase === 'stopped'
                        ? { x: 0, y: [0, -1.5, 0] }
                        : { x: '115vw' }
                }
                transition={
                    phase === 'entering'
                        ? { duration: 1.2, ease: [0.18, 0.89, 0.32, 1.05] } // Realistic brake into position
                        : phase === 'stopped'
                        ? { y: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' } } // Subtle engine idle rumble
                        : { duration: 0.9, ease: [0.65, 0, 0.35, 1] } // Rapid sports car launch
                }
                className="relative flex flex-col items-center"
            >
                {/* FLOATING DIALOGUE MESSAGE BUBBLE (Above the car roof) */}
                <AnimatePresence>
                    {phase === 'stopped' && (
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.88 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.25 } }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="pointer-events-auto relative mb-3 sm:mb-4 w-[330px] sm:w-[440px] rounded-2xl bg-[#09131e]/95 border border-white/20 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(56,217,169,0.18)] backdrop-blur-xl text-center"
                        >
                            {/* Close / Dismiss '✕' button */}
                            <button
                                type="button"
                                onClick={handleDismiss}
                                className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-md transition cursor-pointer"
                                aria-label="Close welcome message"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Header row */}
                            <div className="flex items-center justify-center gap-2 mb-1.5">
                                <span className="inline-flex h-2 w-2 rounded-full bg-mint animate-pulse" />
                                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-mint">
                                    Muhammad Faheem Khan
                                </span>
                            </div>

                            {/* Main caption */}
                            <h3 className="text-sm sm:text-base font-bold text-white font-display">
                                Welcome to my portfolio! 👋
                            </h3>
                            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-snug">
                                Problem solver & software engineer specialized in 3 core domains:
                            </p>

                            {/* 3 Domain Tags: Mobile • Web • AI */}
                            <div className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-mint/15 border border-mint/35 text-[10px] sm:text-[11px] font-bold text-mint shadow-sm">
                                    <span>📱</span>
                                    <span>Mobile</span>
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent/15 border border-accent/35 text-[10px] sm:text-[11px] font-bold text-accent shadow-sm">
                                    <span>💻</span>
                                    <span>Web</span>
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet/20 border border-violet/40 text-[10px] sm:text-[11px] font-bold text-violet shadow-sm">
                                    <span>🤖</span>
                                    <span>AI</span>
                                </span>
                            </div>

                            {/* Speech bubble pointer arrow pointing down to car */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#09131e] border-r border-b border-white/20 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* REALISTIC WHITE & BLACK SUPERCAR */}
                <div className="relative w-[300px] sm:w-[440px] md:w-[500px]">
                    {/* Realistic Ground Shadow under car */}
                    <div className="absolute -bottom-2 left-[5%] w-[90%] h-5 bg-black/80 rounded-full blur-md -z-10" />

                    {/* Headlights Light Beam (Casting forward to the right) */}
                    <div className="pointer-events-none absolute left-[88%] top-[55%] -translate-y-1/2 w-44 sm:w-64 h-24 overflow-hidden z-0">
                        <div
                            className="w-full h-full"
                            style={{
                                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(220, 240, 255, 0.35) 40%, transparent 100%)',
                                clipPath: 'polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)',
                                filter: 'blur(3px)',
                            }}
                        />
                    </div>

                    {/* Acceleration Exhaust Nitro Flame (When accelerating away) */}
                    {phase === 'accelerating' && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 140, opacity: 1 }}
                            className="pointer-events-none absolute right-[98%] top-[68%] -translate-y-1/2 h-6 bg-gradient-to-l from-cyan-400 via-orange-500 to-transparent blur-xs rounded-full z-0"
                        />
                    )}

                    {/* DETAILED REALISTIC SVG: PEARL WHITE & GLOSS BLACK SUPERCAR */}
                    <svg
                        viewBox="0 0 540 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                    >
                        <defs>
                            {/* Pearl White Body Gradient */}
                            <linearGradient id="pearlWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="45%" stopColor="#f1f5f9" />
                                <stop offset="85%" stopColor="#e2e8f0" />
                                <stop offset="100%" stopColor="#cbd5e1" />
                            </linearGradient>

                            {/* Metallic Specular Highlight */}
                            <linearGradient id="whiteHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.9" />
                                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                            </linearGradient>

                            {/* Gloss Piano Black Gradient */}
                            <linearGradient id="glossBlackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e293b" />
                                <stop offset="35%" stopColor="#0f172a" />
                                <stop offset="75%" stopColor="#020617" />
                                <stop offset="100%" stopColor="#000000" />
                            </linearGradient>

                            {/* Dark Tinted Glass with Reflection */}
                            <linearGradient id="tintedGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                                <stop offset="30%" stopColor="#0f172a" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
                            </linearGradient>

                            {/* Carbon Fiber Diffuser Gradient */}
                            <linearGradient id="carbonDiffuser" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#090d16" />
                                <stop offset="50%" stopColor="#1e293b" />
                                <stop offset="100%" stopColor="#090d16" />
                            </linearGradient>

                            {/* Wheel Rim Silver/Gunmetal */}
                            <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#475569" />
                                <stop offset="50%" stopColor="#0f172a" />
                                <stop offset="100%" stopColor="#1e293b" />
                            </linearGradient>
                        </defs>

                        {/* 1. GLOSS BLACK REAR GT AERO WING */}
                        {/* Wing mounts/struts */}
                        <path d="M48 68 L54 85 L58 85 L52 68 Z" fill="#0f172a" />
                        <path d="M68 68 L72 85 L76 85 L72 68 Z" fill="#0f172a" />
                        {/* Wing aerofoil */}
                        <path d="M30 62 C50 60, 85 60, 95 64 L93 68 C80 66, 45 66, 28 66 Z" fill="url(#glossBlackGrad)" stroke="#334155" strokeWidth="0.8" />
                        {/* White wing endplates */}
                        <path d="M26 56 L32 57 L30 72 L24 70 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />

                        {/* 2. PEARL WHITE SUPERCAR BODY (Sleek aerodynamic profile facing right) */}
                        <path
                            d="M40 92 
                               C55 88, 80 84, 115 82 
                               C155 48, 220 38, 320 42 
                               C375 45, 415 65, 470 85 
                               C505 95, 532 108, 534 118 
                               C535 125, 520 130, 480 130 
                               L455 130 
                               C450 108, 408 108, 395 130 
                               L195 130 
                               C190 108, 148 108, 135 130 
                               L52 130 
                               C38 130, 34 120, 36 108 
                               Z"
                            fill="url(#pearlWhiteGrad)"
                            stroke="#cbd5e1"
                            strokeWidth="1.2"
                        />

                        {/* 3. METALLIC BODY SURFACE CONTOUR & REFLECTION HIGHLIGHTS */}
                        <path
                            d="M110 83 C160 52, 220 44, 320 48 C370 50, 410 68, 465 87"
                            stroke="url(#whiteHighlight)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            opacity="0.85"
                        />
                        {/* Door waist character line */}
                        <path
                            d="M135 96 C190 92, 280 92, 385 97"
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                        />
                        {/* Front fender aerodynamic arch crease */}
                        <path
                            d="M390 110 C405 92, 445 92, 465 106"
                            stroke="#cbd5e1"
                            strokeWidth="1"
                        />

                        {/* 4. GLOSS PIANO-BLACK TWO-TONE ROOF & PILLARS */}
                        <path
                            d="M165 76 
                               C188 52, 235 44, 310 46 
                               C355 48, 390 64, 420 78 
                               L370 78 
                               L285 78 
                               Z"
                            fill="url(#tintedGlass)"
                            stroke="#0f172a"
                            strokeWidth="1.5"
                        />
                        {/* Gloss Black A-pillar and roof contour */}
                        <path d="M160 76 C185 50, 230 42, 305 44 L310 48 C235 46, 190 54, 168 78 Z" fill="#020617" />
                        <path d="M305 44 L325 76 L318 78 L298 46 Z" fill="#020617" />

                        {/* Tinted glass interior reflection streak */}
                        <path d="M210 56 L350 72 L335 74 L200 58 Z" fill="#ffffff" opacity="0.15" />

                        {/* 5. GLOSS BLACK AERODYNAMIC SIDE AIR SCOOP */}
                        <path
                            d="M205 98 C230 96, 265 96, 280 102 L275 114 C260 112, 225 112, 210 114 Z"
                            fill="url(#glossBlackGrad)"
                            stroke="#0f172a"
                            strokeWidth="1"
                        />

                        {/* 6. GLOSS BLACK LOWER ROCKER PANELS & SPLITTER (Aero Kit) */}
                        {/* Lower side skirt between wheels */}
                        <rect x="195" y="127" width="200" height="5" rx="1.5" fill="url(#carbonDiffuser)" />
                        {/* Front aero splitter */}
                        <path d="M475 128 L536 124 L534 132 L470 133 Z" fill="url(#glossBlackGrad)" stroke="#1e293b" strokeWidth="0.8" />
                        {/* Rear carbon diffuser */}
                        <path d="M35 125 L55 126 L52 132 L32 130 Z" fill="url(#glossBlackGrad)" />

                        {/* 7. MODERN HIGH-TECH HEADLIGHTS (Sharp Xenon LED) */}
                        <polygon
                            points="480,92 524,106 512,114 476,101"
                            fill="#ffffff"
                            filter="drop-shadow(0 0 6px rgba(255,255,255,0.9))"
                        />
                        <line x1="478" y1="95" x2="520" y2="108" stroke="#38bdf8" strokeWidth="2" />

                        {/* 8. SLIM LED REAR TAIL-LIGHT STRIP (Smoked Red) */}
                        <path
                            d="M36 98 L48 100 L46 108 L34 106 Z"
                            fill="#ef4444"
                            filter="drop-shadow(0 0 5px #ef4444)"
                        />

                        {/* 9. REAR PERFORMANCE WHEEL (Gloss Black + Silver Spokes + Red Brembo Caliper) */}
                        <g transform="translate(165, 130)">
                            {/* Outer Rubber Tire with Tread */}
                            <circle cx="0" cy="0" r="28" fill="#090d16" stroke="#1e293b" strokeWidth="3.5" />
                            {/* Inner Wheel Well Shadow */}
                            <circle cx="0" cy="0" r="24" fill="#020617" />
                            {/* Drilled Performance Brake Disc */}
                            <circle cx="0" cy="0" r="18" fill="#475569" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                            {/* Racing Red Brake Caliper */}
                            <path d="M-6 -17 C0 -19, 10 -18, 14 -13 L11 -9 C8 -12, 1 -13, -4 -11 Z" fill="#ef4444" />
                            
                            {/* Gloss Black Rim with Spinning Twin-Spokes */}
                            <g
                                className={phase !== 'stopped' ? 'animate-spin' : ''}
                                style={{
                                    transformOrigin: '0 0',
                                    animationDuration: phase === 'accelerating' ? '0.18s' : '0.45s',
                                }}
                            >
                                {/* 5 Dual-Spokes (Gloss Black with Polished Silver Face) */}
                                {[0, 72, 144, 216, 288].map((angle) => (
                                    <g key={angle} transform={`rotate(${angle})`}>
                                        <line x1="0" y1="0" x2="0" y2="-21" stroke="#0f172a" strokeWidth="4" />
                                        <line x1="-1.5" y1="0" x2="-1.5" y2="-20" stroke="#e2e8f0" strokeWidth="1.5" />
                                        <line x1="1.5" y1="0" x2="1.5" y2="-20" stroke="#e2e8f0" strokeWidth="1.5" />
                                    </g>
                                ))}
                                {/* Center Hub Cap with Chrome Accent */}
                                <circle cx="0" cy="0" r="5" fill="#0f172a" stroke="#ffffff" strokeWidth="1.2" />
                            </g>
                        </g>

                        {/* 10. FRONT PERFORMANCE WHEEL (Gloss Black + Silver Spokes + Red Brembo Caliper) */}
                        <g transform="translate(425, 130)">
                            {/* Outer Rubber Tire with Tread */}
                            <circle cx="0" cy="0" r="28" fill="#090d16" stroke="#1e293b" strokeWidth="3.5" />
                            {/* Inner Wheel Well Shadow */}
                            <circle cx="0" cy="0" r="24" fill="#020617" />
                            {/* Drilled Performance Brake Disc */}
                            <circle cx="0" cy="0" r="18" fill="#475569" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                            {/* Racing Red Brake Caliper */}
                            <path d="M-6 -17 C0 -19, 10 -18, 14 -13 L11 -9 C8 -12, 1 -13, -4 -11 Z" fill="#ef4444" />
                            
                            {/* Gloss Black Rim with Spinning Twin-Spokes */}
                            <g
                                className={phase !== 'stopped' ? 'animate-spin' : ''}
                                style={{
                                    transformOrigin: '0 0',
                                    animationDuration: phase === 'accelerating' ? '0.18s' : '0.45s',
                                }}
                            >
                                {/* 5 Dual-Spokes (Gloss Black with Polished Silver Face) */}
                                {[0, 72, 144, 216, 288].map((angle) => (
                                    <g key={angle} transform={`rotate(${angle})`}>
                                        <line x1="0" y1="0" x2="0" y2="-21" stroke="#0f172a" strokeWidth="4" />
                                        <line x1="-1.5" y1="0" x2="-1.5" y2="-20" stroke="#e2e8f0" strokeWidth="1.5" />
                                        <line x1="1.5" y1="0" x2="1.5" y2="-20" stroke="#e2e8f0" strokeWidth="1.5" />
                                    </g>
                                ))}
                                {/* Center Hub Cap with Chrome Accent */}
                                <circle cx="0" cy="0" r="5" fill="#0f172a" stroke="#ffffff" strokeWidth="1.2" />
                            </g>
                        </g>
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};

export default CarIntroAnimation;
