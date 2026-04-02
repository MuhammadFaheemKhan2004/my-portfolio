import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const stats = [
        { label: 'Projects Delivered', value: '50+' },
        { label: 'Product Domains', value: '10+' },
        { label: 'Launch Success Rate', value: '98%' },
        { label: 'Technologies', value: '15+' },
    ];

    const highlights = [
        'User-first architecture with measurable performance gains',
        'Mobile and web development under one unified product vision',
        'Strong delivery process from idea validation to production deployment',
    ];

    const experienceBlocks = [
        { title: 'Frontend Impact', desc: 'Responsive interfaces, strong visual systems, and smooth microinteractions.' },
        { title: 'Backend Reliability', desc: 'Secure APIs, clean database models, and maintainable service layers.' },
        { title: 'AI Integration', desc: 'Practical AI features that improve workflows and user outcomes.' },
    ];

    return (
        <section id="about" className="py-16 sm:py-20">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemVariants} className="mb-10">
                        <span className="eyebrow">About</span>
                        <h2 className="section-title mt-4">
                            Engineering with product thinking and bold visual taste.
                        </h2>
                    </motion.div>

                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-7 sm:p-10">
                            <p className="text-lg leading-relaxed text-slate-200">
                                I am Muhammad Faheem Khan, a developer focused on crafting digital products that look premium and feel effortless to use.
                                I combine clean architecture with sharp UI execution so products do not just function, they leave an impression.
                            </p>
                            <p className="mt-5 text-base leading-relaxed text-slate-300">
                                My work blends Flutter and React frontends, performant Node.js backends, and practical AI enhancements. Every build is
                                optimized for speed, scalability, and visual confidence from the first interaction.
                            </p>

                            <div className="mt-7 space-y-3">
                                {highlights.map((item) => (
                                    <div key={item} className="flex gap-3 rounded-xl border border-sand/20 bg-primary/35 p-3">
                                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sand" />
                                        <p className="text-sm text-slate-300">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat) => (
                                    <motion.div
                                        key={stat.label}
                                        variants={itemVariants}
                                        className="glass-panel rounded-2xl p-5"
                                    >
                                        <div className="text-3xl font-extrabold text-sand">{stat.value}</div>
                                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="grid gap-3">
                                {experienceBlocks.map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-mint/25 bg-mint/5 p-4">
                                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mint">{item.title}</p>
                                        <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
