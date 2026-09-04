import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const experiences = [
    {
        role: 'Software Engineer (Mobile & Web)',
        company: 'Fleet AI',
        period: 'Feb 2026 – June 2026',
        description: 'Engineered high-performance mobile and web solutions with AI workflows, responsive client architectures, and robust API integrations.',
        type: 'Work',
        color: 'text-accent',
        bg: 'bg-accent/10 border-accent/20',
        dot: 'bg-accent',
        dotGlow: '0 0 12px rgba(255,122,24,0.5)',
    },
    {
        role: 'Mobile & Web Developer',
        company: 'Client & Startup Solutions',
        period: '2024 – 2026 (2 Years)',
        description: 'Delivered production Flutter mobile apps and full-stack React/Node.js web systems focused on high responsiveness, reliability, and clean UX.',
        type: 'Work',
        color: 'text-mint',
        bg: 'bg-mint/10 border-mint/20',
        dot: 'bg-mint',
        dotGlow: '0 0 12px rgba(56,217,169,0.5)',
    },
    {
        role: 'BS Computer Science',
        company: 'Quaid-i-Azam University Islamabad',
        period: '2022 – 2026',
        description: 'Rigorous software engineering foundations, algorithms, data structures, and practical application development while shipping live products.',
        type: 'Education',
        color: 'text-sand',
        bg: 'bg-sand/10 border-sand/20',
        dot: 'bg-sand',
        dotGlow: '0 0 12px rgba(255,184,108,0.5)',
    },
];

const Experience = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <section id="experience" className="py-20 sm:py-24">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={item} className="mb-14 text-center">
                        <span className="eyebrow">Journey</span>
                        <h2 className="section-title mt-5">
                            A timeline of<br />
                            <span className="shimmer-text">shipping & growth.</span>
                        </h2>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative mx-auto max-w-3xl">
                        {/* Vertical line */}
                        <div className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-accent/50 via-mint/30 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    variants={item}
                                    className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-5 top-7 z-10 sm:left-1/2 sm:-translate-x-1/2">
                                        <span
                                            className={`block h-3 w-3 rounded-full border-2 border-[#050c12] ${exp.dot}`}
                                            style={{ boxShadow: exp.dotGlow }}
                                        />
                                    </div>

                                    {/* Spacer for desktop alternating */}
                                    <div className="hidden sm:block sm:w-1/2" />

                                    {/* Card */}
                                    <div className={`ml-14 flex-1 sm:ml-0 ${i % 2 === 0 ? 'sm:pl-10' : 'sm:pr-10'}`}>
                                        <div className="glass-panel rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                                            {/* Type badge + period */}
                                            <div className="flex items-center justify-between gap-3 mb-3">
                                                <span className={`badge ${exp.bg} ${exp.color} text-[10px]`}>
                                                    {exp.type}
                                                </span>
                                                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#4a6275]">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <h3 className={`text-[16px] font-bold ${exp.color}`}>{exp.role}</h3>
                                            <p className="text-[13px] font-medium text-[#7b97ae] mt-0.5">{exp.company}</p>
                                            <p className="mt-3 text-[13px] leading-[1.75] text-[#7b97ae]">{exp.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
