import { motion } from 'framer-motion';
import profilePic from '../assets/FAHEEM.jpeg';

const Hero = () => {
    const quickStats = [
        { label: 'Projects', value: '50+' },
        { label: 'Years in Build', value: '2+' },
        { label: 'Client Satisfaction', value: '98%' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.14,
                delayChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: 'easeOut' },
        },
    };

    return (
        <section id="home" className="relative min-h-screen pt-28 sm:pt-32">
            <motion.div
                className="section-shell"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <motion.span variants={itemVariants} className="eyebrow mb-6">
                            Mobile + Full Stack Engineer
                        </motion.span>

                        <motion.h1
                            variants={itemVariants}
                            className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
                        >
                            I build products people remember at first glance.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="section-subtitle mt-6 max-w-2xl"
                        >
                            I am Muhammad Faheem Khan. I craft high-performance digital experiences across Flutter,
                            React, Node.js, and AI integrations with a focus on clarity, speed, and visual impact.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-9 flex flex-wrap items-center gap-4"
                        >
                            <a
                                href="#projects"
                                className="rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary transition hover:bg-accent-hover"
                            >
                                See My Work
                            </a>
                            <a
                                href="#contact"
                                className="rounded-full border border-sand/45 px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-sand transition hover:bg-sand/10"
                            >
                                Start A Project
                            </a>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-10 grid gap-3 sm:grid-cols-3"
                        >
                            {quickStats.map((item) => (
                                <div key={item.label} className="glass-panel rounded-2xl p-4">
                                    <p className="text-2xl font-extrabold text-sand sm:text-3xl">{item.value}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-300">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative mx-auto w-full max-w-sm lg:max-w-md">
                        <div className="absolute -left-10 top-7 h-28 w-28 rounded-full bg-accent/30 blur-2xl" />
                        <div className="absolute -bottom-8 -right-12 h-40 w-40 rounded-full bg-mint/25 blur-3xl" />

                        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-sand/10 via-transparent to-mint/10" />

                            <div className="relative rounded-[1.5rem] border border-slate-100/10 bg-primary/60 p-4">
                                <div className="float-drift absolute -right-4 -top-4 rounded-full border border-sand/30 bg-primary/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-sand">
                                    Available for Freelance
                                </div>

                                <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-slate-100/10">
                                    <img
                                        src={profilePic}
                                        alt="Muhammad Faheem Khan"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-secondary/70 p-3">
                                        <p className="text-xs uppercase tracking-[0.13em] text-slate-400">Primary Stack</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-100">Flutter • React • Node</p>
                                    </div>
                                    <div className="rounded-xl bg-secondary/70 p-3">
                                        <p className="text-xs uppercase tracking-[0.13em] text-slate-400">Delivery Focus</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-100">Performance + UX</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
