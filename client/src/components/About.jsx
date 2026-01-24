import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
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
        { label: 'Projects Done', value: '50+' },
        { label: 'Years Experience', value: '2+' },
        { label: 'Technologies', value: '15+' },
        { label: 'Happy Clients', value: '30+' },
    ];

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-center">
                        About <span className="text-accent">Me</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants}>
                            <p className="text-gray-300 text-lg mb-6">
                                Hi! I'm Muhammad Faheem Khan, a passionate mobile and full-stack developer from Pakistan. I specialize in building scalable, user-centric applications using modern technologies.
                            </p>
                            <p className="text-gray-300 text-lg mb-6">
                                With expertise in Flutter, Kotlin, React, Node.js, and AI integration, I create applications that solve real-world problems. I'm committed to writing clean, maintainable code and delivering exceptional user experiences.
                            </p>
                            <p className="text-gray-300 text-lg">
                                When I'm not coding, I love exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-secondary/50 p-6 rounded-lg border border-secondary hover:border-accent/50 transition-colors"
                                >
                                    <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
