import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

const Skills = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    const skillCategories = [
        {
            category: 'Mobile',
            skills: ['Flutter', 'Kotlin', 'Firebase', 'GetX', 'Provider'],
        },
        {
            category: 'Frontend',
            skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
            category: 'Backend',
            skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'CORS'],
        },
        {
            category: 'Databases',
            skills: ['MongoDB', 'Firebase Realtime', 'Mongoose', 'SQL'],
        },
        {
            category: 'Languages',
            skills: ['Dart', 'Kotlin', 'JavaScript', 'TypeScript', 'Python'],
        },
        {
            category: 'AI & APIs',
            skills: ['OpenAI API', 'Google APIs', 'News API', 'Gemini API', 'Custom AI Models'],
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
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-center">
                        My <span className="text-accent">Skills</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillCategories.map((cat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-secondary/50 p-6 rounded-lg border border-secondary hover:border-accent/50 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-accent">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/30 hover:bg-accent hover:text-white transition-colors"
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
