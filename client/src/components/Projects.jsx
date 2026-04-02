import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ProjectService } from '@/services/api';

const Projects = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultProjects = [
        {
            _id: '1',
            title: 'Exam Master Platform',
            description: 'Large-scale exam prep product with MCQ engine, progress analytics, and job-alert workflows for competitive exams.',
            image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
            technologies: ['Flutter', 'Firebase', 'Kotlin'],
            github: 'https://github.com',
            demo: 'https://example.com',
            featured: true,
        },
        {
            _id: '2',
            title: 'AI Legal Assistant',
            description: 'AI-powered legal roadmap app that transforms user case details into clear action plans and compliance checklists.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
            technologies: ['React', 'Node.js', 'AI', 'MongoDB'],
            github: 'https://github.com',
            demo: 'https://example.com',
            featured: true,
        },
        {
            _id: '3',
            title: 'Events Commerce Suite',
            description: 'End-to-end event planning and vendor booking system with role-based dashboards and payment flow support.',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
            technologies: ['React', 'Express', 'MongoDB', 'Stripe'],
            github: 'https://github.com',
            demo: 'https://example.com',
            featured: true,
        },
        {
            _id: '4',
            title: 'Realtime Chat Workspace',
            description: 'Realtime communication app with presence tracking, media support, and smooth cross-device conversation continuity.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=80',
            technologies: ['React', 'Firebase', 'Node.js'],
            github: 'https://github.com',
            demo: 'https://example.com',
            featured: false,
        },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await ProjectService.getAll();
                if (response.data && response.data.length > 0) {
                    setProjects(response.data);
                } else {
                    setProjects(defaultProjects);
                }
                setLoading(false);
            } catch (err) {
                console.log('Using fallback project data:', err.message);
                setProjects(defaultProjects);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
        <section id="projects" className="py-16 sm:py-20">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemVariants} className="mb-10 text-center">
                        <span className="eyebrow">Selected Work</span>
                        <h2 className="section-title mt-4">Products built for impact and retention.</h2>
                    </motion.div>

                    {loading ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {[1, 2].map((item) => (
                                <div key={item} className="glass-panel rounded-3xl p-6">
                                    <div className="h-44 animate-pulse rounded-2xl bg-secondary/80" />
                                    <div className="mt-5 h-5 w-2/3 animate-pulse rounded bg-secondary/80" />
                                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-secondary/70" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    variants={itemVariants}
                                    className="glass-panel group overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-56 overflow-hidden border-b border-slate-100/10">
                                        {project.featured && (
                                            <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                                                Featured
                                            </span>
                                        )}

                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

                                        <div className="mb-6 mt-4 flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full border border-sand/30 bg-primary/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-sand"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 rounded-full border border-slate-400/40 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-slate-200/50 hover:bg-slate-100/10"
                                            >
                                                GitHub
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 rounded-full bg-accent px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:bg-accent-hover"
                                            >
                                                Live Preview
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
