import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Skill {
    category: string;
    items: string[];
}

const Skills: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    const skills: Skill[] = [
        {
            category: 'Mobile Development',
            items: ['Kotlin', 'Flutter', 'Android SDK', 'Firebase'],
        },
        {
            category: 'Frontend',
            items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
            category: 'Backend',
            items: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
        },
        {
            category: 'Databases & Tools',
            items: ['Firebase Auth', 'Firestore', 'Realtime DB', 'Room Database', 'SQL'],
        },
        {
            category: 'Languages',
            items: ['Java', 'C++', 'JavaScript', 'Dart'],
        },
        {
            category: 'AI & APIs',
            items: ['AI Integration', 'News API', 'Maps API', 'Webhooks'],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold mb-12 text-center"
                    >
                        <span className="text-accent">Skills</span> & Expertise
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-secondary/50 p-6 rounded-lg border border-secondary hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                            >
                                <h3 className="text-xl font-semibold text-accent mb-4">
                                    {skill.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm border border-accent/30 hover:bg-accent/20 transition-colors"
                                        >
                                            {item}
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
