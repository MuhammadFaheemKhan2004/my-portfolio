import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ProjectService } from '@/services/api';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

// Fallback static data for when API is unavailable
const FALLBACK_PROJECTS = [
    {
        _id: '1',
        title: 'Exam Master App',
        description: '50,000+ MCQs platform for CSS, PMS, PPSC, ECAT, MDCAT with real-time job alerts and Firebase backend.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
        technologies: ['Flutter', 'Firebase', 'Kotlin'],
        github: 'https://github.com',
        demo: '',
        playStoreUrl: 'https://play.google.com/store',
        type: 'mobile',
        featured: true,
    },
    {
        _id: '2',
        title: 'AI Lawyer App',
        description: 'Intelligent legal assistant with case-specific roadmaps, document analysis, and AI-powered legal insights.',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
        technologies: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
        github: 'https://github.com',
        demo: 'https://ailawyer.example.com',
        playStoreUrl: '',
        type: 'fullstack',
        featured: true,
    },
    {
        _id: '3',
        title: 'News Aggregator App',
        description: 'Real-time news with intelligent category filtering, personalized recommendations, and offline reading.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
        technologies: ['Flutter', 'News API', 'Firebase', 'Dart'],
        github: 'https://github.com',
        demo: '',
        playStoreUrl: 'https://play.google.com/store',
        type: 'mobile',
        featured: false,
    },
    {
        _id: '4',
        title: 'Google Maps Integration',
        description: 'Advanced location services with real-time navigation, route optimization, and GPS tracking.',
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop',
        technologies: ['Kotlin', 'Google Maps API', 'Android SDK'],
        github: 'https://github.com',
        demo: '',
        playStoreUrl: 'https://play.google.com/store',
        type: 'mobile',
        featured: false,
    },
    {
        _id: '5',
        title: 'Event Management Platform',
        description: 'Complete wedding & event planning solution with vendor management, budgets, and payment integration.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        demo: 'https://eventmanager.example.com',
        playStoreUrl: '',
        type: 'fullstack',
        featured: true,
    },
    {
        _id: '6',
        title: 'Real-Time Chat App',
        description: 'Instant messaging with typing indicators, read receipts, group chats, and Firebase Realtime Database.',
        image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&h=400&fit=crop',
        technologies: ['React', 'Firebase', 'TypeScript'],
        github: 'https://github.com',
        demo: 'https://chatapp.example.com',
        playStoreUrl: '',
        type: 'web',
        featured: false,
    },
];

const FILTERS = ['All', 'Mobile', 'Web', 'Full Stack'];

const typeBadge = {
    mobile: { label: 'Mobile App', cls: 'badge-mobile', icon: '📱' },
    web: { label: 'Web App', cls: 'badge-web', icon: '🌐' },
    fullstack: { label: 'Full Stack', cls: 'badge-fullstack', icon: '⚡' },
};

function ProjectCard({ project }) {
    const badge = typeBadge[project.type] || typeBadge.web;

    return (
        <motion.article
            variants={item}
            className="project-card glass-panel group"
            aria-label={project.title}
        >
            {/* Image area */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="project-card-overlay" />

                {/* Top badges */}
                <div className="absolute left-4 top-4 flex items-center gap-2 z-10">
                    <span className={`badge ${badge.cls}`}>
                        <span>{badge.icon}</span> {badge.label}
                    </span>
                    {project.featured && (
                        <span className="badge" style={{ background: 'rgba(255,184,108,0.15)', border: '1px solid rgba(255,184,108,0.35)', color: '#ffb86c' }}>
                            ★ Featured
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-display text-[17px] font-bold text-white leading-tight">
                    {project.title}
                </h3>

                {/* Description — hidden by default, revealed on hover via CSS */}
                <p className="project-card-desc mt-2 text-[13px] leading-[1.75] text-[#7b97ae]">
                    {project.description}
                </p>

                {/* Tech pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-white/8 bg-white/4 px-2.5 py-0.5 text-[11px] font-medium text-[#7b97ae]"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* CTA buttons — smart, only render available links */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.playStoreUrl && (
                        <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-playstore"
                            aria-label={`${project.title} on Play Store`}
                        >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5C3.5 20.83 3 20.5 3 20.5z" />
                            </svg>
                            Play Store
                        </a>
                    )}
                    {project.demo && !project.playStoreUrl && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-demo"
                            aria-label={`${project.title} live demo`}
                        >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-github"
                            aria-label={`${project.title} GitHub repository`}
                        >
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

// Skeleton loader
function SkeletonCard() {
    return (
        <div className="glass-panel rounded-2xl overflow-hidden animate-pulse">
            <div className="h-52 bg-secondary/60" />
            <div className="p-5">
                <div className="h-4 w-2/3 rounded bg-secondary/60" />
                <div className="mt-3 h-3 w-full rounded bg-secondary/50" />
                <div className="mt-2 h-3 w-4/5 rounded bg-secondary/50" />
                <div className="mt-4 flex gap-2">
                    <div className="h-7 w-20 rounded-full bg-secondary/60" />
                    <div className="h-7 w-16 rounded-full bg-secondary/60" />
                </div>
            </div>
        </div>
    );
}

const Projects = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await ProjectService.getAll();
                // Handle both: plain array OR { data: [...] } wrapped response
                const raw = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data?.data)
                        ? res.data.data
                        : [];

                if (raw.length === 0) {
                    setProjects(FALLBACK_PROJECTS);
                } else {
                    // Normalise: add default type/playStoreUrl if missing (old DB records)
                    const normalised = raw.map((p) => ({
                        ...p,
                        type: p.type || 'web',
                        playStoreUrl: p.playStoreUrl || '',
                    }));
                    setProjects(normalised);
                }
            } catch {
                setProjects(FALLBACK_PROJECTS);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filtered = projects.filter((p) => {
        if (activeFilter === 'All') return true;
        const t = p.type || 'web';
        if (activeFilter === 'Mobile') return t === 'mobile';
        if (activeFilter === 'Web') return t === 'web';
        if (activeFilter === 'Full Stack') return t === 'fullstack';
        return true;
    });

    return (
        <section id="projects" className="py-20 sm:py-24">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={item} className="mb-10 text-center">
                        <span className="eyebrow">Selected Work</span>
                        <h2 className="section-title mt-5">
                            Products built for<br />
                            <span className="shimmer-text">impact & retention.</span>
                        </h2>
                        <p className="section-subtitle mx-auto mt-4 max-w-lg">
                            Hover any card to see the full story.
                        </p>
                    </motion.div>

                    {/* Filter tabs */}
                    <motion.div variants={item} className="mb-8 flex flex-wrap items-center justify-center gap-2">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
                                aria-pressed={activeFilter === f}
                            >
                                {f}
                            </button>
                        ))}
                    </motion.div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
                        </div>
                    ) : (
                        <motion.div
                            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filtered.length > 0 ? (
                                filtered.map((project) => (
                                    <ProjectCard key={project._id} project={project} />
                                ))
                            ) : (
                                <div className="col-span-full py-16 text-center">
                                    <p className="text-[15px] text-[#7b97ae]">No projects in this category yet.</p>
                                    <p className="mt-2 text-[13px] text-[#4a6275]">Check back soon or view all projects.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
