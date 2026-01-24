import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Experience {
    year: string;
    title: string;
    company: string;
    description: string;
}

interface Education {
    year: string;
    degree: string;
    institution: string;
    gpa?: string;
}

const Experience: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    const experiences: Experience[] = [
        {
            year: '2024 - Present',
            title: 'Full-Stack Developer',
            company: 'Tech Solutions Inc',
            description: 'Building scalable MERN applications with focus on performance and user experience.',
        },
        {
            year: '2023 - 2024',
            title: 'Mobile App Developer',
            company: 'Mobile Innovations',
            description: 'Developed 5+ production Android apps using Kotlin and Firebase integration.',
        },
        {
            year: '2022 - 2023',
            title: 'Junior Developer',
            company: 'StartUp Labs',
            description: 'Started career building Flutter apps and learning backend technologies.',
        },
    ];

    const education: Education[] = [
        {
            year: '2022 - 2026',
            degree: 'BS Computer Science',
            institution: 'Quaid-e-Azam University, Islamabad',
            gpa: '3.8/4.0',
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
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
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
                        <span className="text-accent">Experience</span> & Education
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Experience */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-8 text-accent">Work Experience</h3>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="border-l-2 border-accent pl-6 py-2"
                                    >
                                        <p className="text-accent font-semibold text-sm">{exp.year}</p>
                                        <h4 className="text-xl font-semibold mt-1">{exp.title}</h4>
                                        <p className="text-gray-400">{exp.company}</p>
                                        <p className="text-gray-300 mt-2">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-8 text-accent">Education</h3>
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="border-l-2 border-accent pl-6 py-2"
                                    >
                                        <p className="text-accent font-semibold text-sm">{edu.year}</p>
                                        <h4 className="text-xl font-semibold mt-1">{edu.degree}</h4>
                                        <p className="text-gray-400">{edu.institution}</p>
                                        {edu.gpa && <p className="text-gray-300 mt-2">GPA: {edu.gpa}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
