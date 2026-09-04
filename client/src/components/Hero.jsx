import { motion } from 'framer-motion';
import profilePic from '../assets/FAHEEM.jpeg';

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.13, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const stats = [
    { value: '2+', label: 'Years Exp.' },
    { value: '50+', label: 'Projects' },
    { value: '98%', label: 'Satisfaction' },
];

const Hero = () => (
    <section id="home" className="relative min-h-screen pt-32 sm:pt-36 pb-16">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-1/4 top-24 h-72 w-72 rounded-full bg-accent/10 blur-[90px]" />
        <div className="pointer-events-none absolute right-1/4 top-40 h-56 w-56 rounded-full bg-mint/8 blur-[80px]" />

        <motion.div
            className="section-shell"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left — text */}
                <div>
                    <motion.div variants={item}>
                        <span className="eyebrow">
                            <span className="pulse-glow inline-block h-1.5 w-1.5 rounded-full bg-mint" />
                            Available for Opportunities
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="mt-6 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
                    >
                        Solving real problems<br />
                        <span className="shimmer-text">through scalable products.</span>
                    </motion.h1>

                    <motion.p variants={item} className="mt-6 max-w-xl text-[1rem] leading-[1.8] text-[#7b97ae]">
                        Muhammad Faheem Khan — Mobile & Web Engineer with 2 years of experience crafting
                        high-performance, problem-solving applications with Flutter, React, Node.js, and AI.
                    </motion.p>

                    <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
                        <a href="#projects" className="btn-primary">
                            View My Work
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="#contact" className="btn-ghost">
                            Start a Project
                        </a>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div variants={item} className="mt-12 flex items-center gap-8">
                        {stats.map((s, i) => (
                            <div key={s.label} className="flex items-center gap-3">
                                {i > 0 && <span className="h-8 w-px bg-white/8" />}
                                <div>
                                    <p className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
                                    <p className="mt-0.5 text-[11px] uppercase tracking-widest text-[#7b97ae]">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — profile card */}
                <motion.div variants={item} className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
                    {/* Decorative rings */}
                    <div className="absolute -inset-6 rounded-[2.5rem] border border-accent/8" />
                    <div className="absolute -inset-12 rounded-[3rem] border border-white/4" />

                    {/* Floating badge */}
                    <div className="float-drift absolute -right-5 -top-4 z-10 glass-panel rounded-xl px-3.5 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7b97ae]">Stack</p>
                        <p className="mt-0.5 text-xs font-bold text-white">Flutter · React · Node</p>
                    </div>

                    {/* Bottom badge */}
                    <div className="float-drift absolute -bottom-3 -left-4 z-10 glass-panel rounded-xl px-3.5 py-2.5" style={{ animationDelay: '3s' }}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-mint">Open to Work</p>
                        <p className="mt-0.5 text-xs font-bold text-white">Remote · Hybrid</p>
                    </div>

                    {/* Main card */}
                    <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-1.5">
                        <div className="overflow-hidden rounded-[1.65rem]">
                            <img
                                src={profilePic}
                                alt="Muhammad Faheem Khan"
                                className="h-full w-full object-cover aspect-[3/4] transition-transform duration-700 hover:scale-105"
                                loading="eager"
                            />
                        </div>
                        {/* Name overlay at bottom of image */}
                        <div className="absolute bottom-0 left-0 right-0 rounded-b-[1.65rem] bg-gradient-to-t from-[#050c12]/95 to-transparent px-5 py-5">
                            <p className="font-display text-base font-bold text-white">Muhammad Faheem Khan</p>
                            <p className="text-[11px] text-[#7b97ae] mt-0.5">Mobile + Full Stack Engineer</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    </section>
);

export default Hero;
