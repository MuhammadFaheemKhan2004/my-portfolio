import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const skillCategories = [
    {
        category: 'Mobile Engineering',
        icon: '📱',
        skills: ['Flutter', 'Kotlin', 'Firebase', 'GetX', 'Provider'],
        level: 94,
        accent: '#9b7fe8',
        accentBg: 'bg-violet/8 border-violet/15',
        accentText: 'text-violet',
    },
    {
        category: 'Frontend Systems',
        icon: '🖥️',
        skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
        level: 92,
        accent: '#ff7a18',
        accentBg: 'bg-accent/8 border-accent/15',
        accentText: 'text-accent',
    },
    {
        category: 'Backend APIs',
        icon: '⚙️',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT'],
        level: 90,
        accent: '#38d9a9',
        accentBg: 'bg-mint/8 border-mint/15',
        accentText: 'text-mint',
    },
    {
        category: 'Database Layer',
        icon: '🗄️',
        skills: ['MongoDB', 'Firebase Realtime', 'Mongoose', 'SQL'],
        level: 88,
        accent: '#ffb86c',
        accentBg: 'bg-sand/8 border-sand/15',
        accentText: 'text-sand',
    },
    {
        category: 'Languages',
        icon: '{ }',
        skills: ['Dart', 'Kotlin', 'JavaScript', 'Python'],
        level: 91,
        accent: '#ff7a18',
        accentBg: 'bg-accent/8 border-accent/15',
        accentText: 'text-accent',
    },
    {
        category: 'AI + Integrations',
        icon: '🤖',
        skills: ['OpenAI API', 'Gemini API', 'Google APIs', 'News API'],
        level: 86,
        accent: '#38d9a9',
        accentBg: 'bg-mint/8 border-mint/15',
        accentText: 'text-mint',
    },
];

const Skills = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <section id="skills" className="py-20 sm:py-24">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={item} className="mb-14 text-center">
                        <span className="eyebrow">Capabilities</span>
                        <h2 className="section-title mt-5">
                            Built across every layer<br />
                            <span className="shimmer-text">of the stack.</span>
                        </h2>
                        <p className="section-subtitle mx-auto mt-4 max-w-xl">
                            A practical stack for shipping fast without sacrificing quality.
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {skillCategories.map((cat) => (
                            <motion.div
                                key={cat.category}
                                variants={item}
                                className="glass-panel group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
                            >
                                {/* Card header */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-base ${cat.accentBg}`}>
                                            {cat.icon}
                                        </span>
                                        <h3 className="text-[15px] font-semibold text-white">{cat.category}</h3>
                                    </div>
                                    <span className={`text-lg font-bold font-display ${cat.accentText}`}>
                                        {cat.level}%
                                    </span>
                                </div>

                                {/* Skill bar */}
                                <div className="skill-bar-track mt-4">
                                    <motion.div
                                        className="skill-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={isVisible ? { width: `${cat.level}%` } : { width: 0 }}
                                        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
                                        style={{
                                            background: `linear-gradient(90deg, ${cat.accent}99, ${cat.accent})`,
                                        }}
                                    />
                                </div>

                                {/* Skill pills */}
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-[#7b97ae] transition group-hover:border-white/12 group-hover:text-[#d1dce8]"
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
