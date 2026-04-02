import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRef } from 'react';

const Skills = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    const skillCategories = [
        {
            category: 'Mobile Engineering',
            skills: ['Flutter', 'Kotlin', 'Firebase', 'GetX', 'Provider'],
            level: 94,
        },
        {
            category: 'Frontend Systems',
            skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'State Design'],
            level: 92,
        },
        {
            category: 'Backend APIs',
            skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'CORS'],
            level: 90,
        },
        {
            category: 'Database Layer',
            skills: ['MongoDB', 'Firebase Realtime', 'Mongoose', 'SQL'],
            level: 88,
        },
        {
            category: 'Languages',
            skills: ['Dart', 'Kotlin', 'JavaScript', 'Python'],
            level: 91,
        },
        {
            category: 'AI + Integrations',
            skills: ['OpenAI API', 'Google APIs', 'News API', 'Gemini API', 'Custom AI Models'],
            level: 86,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="skills" className="py-16 sm:py-20">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemVariants} className="mb-10 text-center">
                        <span className="eyebrow">Capabilities</span>
                        <h2 className="section-title mt-4">Crafted across mobile, web, backend, and AI.</h2>
                        <p className="section-subtitle mx-auto mt-4 max-w-3xl">
                            A practical stack built for shipping products fast without sacrificing long-term maintainability.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {skillCategories.map((cat) => (
                            <motion.div
                                key={cat.category}
                                variants={itemVariants}
                                className="glass-panel rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-semibold text-slate-100">{cat.category}</h3>
                                    <span className="rounded-full border border-sand/30 px-2.5 py-1 text-xs font-semibold text-sand">
                                        {cat.level}%
                                    </span>
                                </div>

                                <div className="mt-4 h-2 rounded-full bg-slate-900/70">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-accent to-mint"
                                        style={{ width: `${cat.level}%` }}
                                    />
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {cat.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="rounded-full border border-slate-400/35 bg-primary/45 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-slate-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
