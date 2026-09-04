import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stats = [
    { value: '50+', label: 'Projects Delivered', color: 'text-accent' },
    { value: '10+', label: 'Product Domains', color: 'text-mint' },
    { value: '98%', label: 'Success Rate', color: 'text-violet' },
    { value: '15+', label: 'Technologies', color: 'text-sand' },
];

const pillars = [
    {
        icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Frontend Impact',
        desc: 'Pixel-perfect interfaces with smooth micro-interactions.',
        color: 'text-accent',
        bg: 'bg-accent/8 border-accent/15',
    },
    {
        icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
            </svg>
        ),
        title: 'Backend Reliability',
        desc: 'Secure APIs, clean models, scalable service layers.',
        color: 'text-mint',
        bg: 'bg-mint/8 border-mint/15',
    },
    {
        icon: (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: 'AI Integration',
        desc: 'Practical AI that improves workflows and outcomes.',
        color: 'text-violet',
        bg: 'bg-violet/8 border-violet/15',
    },
];

const About = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <section id="about" className="py-20 sm:py-24">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={item} className="mb-14">
                        <span className="eyebrow">About</span>
                        <h2 className="section-title mt-5 max-w-2xl">
                            Engineering with product thinking<br />
                            <span className="shimmer-text">& bold visual taste.</span>
                        </h2>
                    </motion.div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                        {/* Left — bio */}
                        <motion.div variants={item} className="glass-panel rounded-3xl p-8 sm:p-10">
                            <p className="text-[1.05rem] leading-[1.85] text-[#d1dce8]">
                                I'm <span className="font-semibold text-white">Muhammad Faheem Khan</span> — a Mobile & Web Engineer
                                with <span className="text-white font-medium">2 years of hands-on experience</span> solving complex product
                                problems through clean architecture, scalable code, and intuitive user experiences.
                            </p>
                            <p className="mt-5 text-[0.925rem] leading-[1.85] text-[#7b97ae]">
                                Former Software Engineer at <span className="text-white font-medium">Fleet AI</span>, specializing in production
                                Flutter mobile apps, responsive React web platforms, and robust Node.js APIs designed for speed, security,
                                and measurable user impact.
                            </p>

                            {/* Pillar cards */}
                            <div className="mt-8 grid gap-3">
                                {pillars.map((p) => (
                                    <div
                                        key={p.title}
                                        className={`flex items-start gap-4 rounded-xl border p-4 ${p.bg}`}
                                    >
                                        <span className={`mt-0.5 shrink-0 ${p.color}`}>{p.icon}</span>
                                        <div>
                                            <p className={`text-[13px] font-bold uppercase tracking-wider ${p.color}`}>{p.title}</p>
                                            <p className="mt-0.5 text-[13px] text-[#7b97ae]">{p.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — stats grid */}
                        <motion.div variants={item} className="grid grid-cols-2 gap-4 content-start">
                            {stats.map((s) => (
                                <div key={s.label} className="stat-card glass-panel">
                                    <p className={`font-display text-4xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-[#7b97ae]">{s.label}</p>
                                </div>
                            ))}

                            {/* Extra info card */}
                            <div className="col-span-2 glass-panel rounded-2xl p-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                                            <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#7b97ae]">Location</p>
                                            <p className="text-xs font-semibold text-white">Islamabad, Pakistan</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint/15">
                                            <svg className="h-4 w-4 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#7b97ae]">Education (2022–2026)</p>
                                            <p className="text-xs font-semibold text-white">Quaid-i-Azam University</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['Problem Solving', 'Fleet AI (2026)', '2 Yrs Mob & Web', 'Flutter & React', 'Clean APIs'].map((tag) => (
                                        <span key={tag} className="rounded-full bg-white/5 border border-white/8 px-3 py-1 text-[11px] font-medium text-[#7b97ae]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
