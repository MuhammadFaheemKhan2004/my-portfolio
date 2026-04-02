import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRef } from 'react';

const Experience = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    const experiences = [
        {
            role: 'Full Stack Developer',
            company: 'Product and Startup Projects',
            period: '2023 - Present',
            description: 'Leading complete product delivery from UI architecture to backend APIs for mobile and web solutions.',
            type: 'Work',
        },
        {
            role: 'Mobile App Developer',
            company: 'Client Product Builds',
            period: '2022 - 2023',
            description: 'Built production-grade Flutter applications with Firebase, push notifications, and real-time syncing.',
            type: 'Work',
        },
        {
            role: 'Frontend Engineer',
            company: 'Web Development Projects',
            period: '2021 - 2022',
            description: 'Designed responsive React interfaces with performance-first component systems and cleaner UX flows.',
            type: 'Work',
        },
        {
            role: 'BS Computer Science',
            company: 'Quaid-e-Azam University',
            period: '2020 - 2024',
            description: 'Solidified software engineering foundations while shipping practical projects with real users.',
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
        <section id="experience" className="py-16 sm:py-20">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemVariants} className="mb-10 text-center">
                        <span className="eyebrow">Journey</span>
                        <h2 className="section-title mt-4">A timeline focused on shipping and growth.</h2>
                    </motion.div>

                    <div className="relative mx-auto max-w-4xl space-y-6 before:absolute before:left-3 before:top-2 before:h-[95%] before:w-px before:bg-gradient-to-b before:from-sand/70 before:to-mint/40 sm:before:left-1/2 sm:before:-translate-x-1/2">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative sm:w-[48%] ${index % 2 === 0 ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'}`}
                            >
                                <span className="absolute left-3 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-sand bg-accent sm:left-auto sm:right-0 sm:translate-x-1/2" />

                                <div className="glass-panel ml-7 rounded-2xl p-5 sm:ml-0">
                                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{exp.period}</span>
                                        <span
                                            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${exp.type === 'Work' ? 'bg-accent/20 text-sand' : 'bg-mint/15 text-mint'}`}
                                        >
                                            {exp.type}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                                    <p className="text-sm text-slate-400">{exp.company}</p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
