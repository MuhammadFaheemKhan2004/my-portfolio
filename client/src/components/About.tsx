import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const About: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
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
                        <span className="text-accent">About</span> Me
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants}>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                I am a highly skilled and passionate Mobile Developer with expertise in building dynamic, scalable, and user-friendly applications. I specialize in Kotlin, Flutter, Firebase, and modern backend technologies, with experience in real-time databases, AI-powered solutions, API integrations, and advanced UI/UX design.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                Currently pursuing my BS in Computer Science at Quaid-e-Azam University, I combine academic knowledge with practical experience to deliver production-grade solutions. My passion lies in creating seamless user experiences while writing clean, maintainable code.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Beyond coding, I'm interested in exploring emerging technologies, contributing to open-source projects, and mentoring junior developers. Let's collaborate and build something extraordinary together!
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="bg-gradient-to-br from-accent/10 to-blue-600/10 p-6 rounded-lg border border-accent/20">
                                <h3 className="text-3xl font-bold text-accent mb-2">50+</h3>
                                <p className="text-gray-300">Projects Completed</p>
                            </div>
                            <div className="bg-gradient-to-br from-accent/10 to-blue-600/10 p-6 rounded-lg border border-accent/20">
                                <h3 className="text-3xl font-bold text-accent mb-2">2+</h3>
                                <p className="text-gray-300">Years Experience</p>
                            </div>
                            <div className="bg-gradient-to-br from-accent/10 to-blue-600/10 p-6 rounded-lg border border-accent/20">
                                <h3 className="text-3xl font-bold text-accent mb-2">15+</h3>
                                <p className="text-gray-300">Technologies</p>
                            </div>
                            <div className="bg-gradient-to-br from-accent/10 to-blue-600/10 p-6 rounded-lg border border-accent/20">
                                <h3 className="text-3xl font-bold text-accent mb-2">30+</h3>
                                <p className="text-gray-300">Happy Clients</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
