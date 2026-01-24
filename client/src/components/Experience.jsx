import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

const Experience = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    const experiences = [
        {
            role: 'Full Stack Developer',
            company: 'Tech Startup',
            period: '2023 - Present',
            description: 'Developing mobile and web applications using Flutter and React with Node.js backend.',
            type: 'Work',
        },
        {
            role: 'Mobile Developer',
            company: 'App Development Agency',
            period: '2022 - 2023',
            description: 'Built cross-platform mobile applications using Flutter with Firebase integration.',
            type: 'Work',
        },
        {
            role: 'Junior Developer',
            company: 'Web Solutions',
            period: '2022 - 2022',
            description: 'Started career working with React and JavaScript for web development projects.',
            type: 'Work',
        },
        {
            role: 'BS Computer Science',
            company: 'Quaid-e-Azam University',
            period: '2020 - 2024',
            description: 'Completed degree with focus on software development and computer science fundamentals.',
            type: 'Education',
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
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-center">
                        Experience & <span className="text-accent">Education</span>
                    </motion.h2>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-secondary/50 p-6 rounded-lg border border-secondary hover:border-accent/50 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-accent">{exp.role}</h3>
                                        <p className="text-gray-400">{exp.company}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-sm font-medium ${exp.type === 'Work'
                                            ? 'bg-accent/20 text-accent'
                                            : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {exp.type}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
                                <p className="text-gray-300">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
