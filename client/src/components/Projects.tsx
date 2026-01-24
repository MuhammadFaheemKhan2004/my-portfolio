import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ProjectService } from '@/services/api';

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    demo: string;
    featured: boolean;
}

const Projects: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Default projects if backend is not available
    const defaultProjects: Project[] = [
        {
            _id: '1',
            title: 'Exam Master App',
            description: 'Practice app for CSS, PMS, PPSC, FPPSC, NTS, PTS, ECAT, MDCAT with 50,000+ MCQs and job alerts.',
            image: 'https://via.placeholder.com/400x300?text=Exam+Master',
            technologies: ['Flutter', 'Firebase', 'Kotlin'],
            github: 'https://github.com',
            demo: 'https://exammaster.com',
            featured: true,
        },
        {
            _id: '2',
            title: 'AI Lawyer App',
            description: 'AI-powered legal assistant providing case-specific roadmaps and legal insights using trained AI models.',
            image: 'https://via.placeholder.com/400x300?text=AI+Lawyer',
            technologies: ['React', 'Node.js', 'AI/ML', 'MongoDB'],
            github: 'https://github.com',
            demo: 'https://ailawyer.com',
            featured: true,
        },
        {
            _id: '3',
            title: 'News App',
            description: 'Real-time news aggregator with category-based filtering powered by News API.',
            image: 'https://via.placeholder.com/400x300?text=News+App',
            technologies: ['Flutter', 'News API', 'Firebase'],
            github: 'https://github.com',
            demo: 'https://newsapp.com',
            featured: false,
        },
        {
            _id: '4',
            title: 'Google Maps Integration App',
            description: 'Location-based services with navigation and real-time tracking capabilities.',
            image: 'https://via.placeholder.com/400x300?text=Maps+App',
            technologies: ['Kotlin', 'Google Maps API', 'Android SDK'],
            github: 'https://github.com',
            demo: 'https://mapsapp.com',
            featured: false,
        },
        {
            _id: '5',
            title: 'Event Management App',
            description: 'Complete wedding and event planning platform with booking and scheduling system.',
            image: 'https://via.placeholder.com/400x300?text=Event+Manager',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: 'https://github.com',
            demo: 'https://eventmanager.com',
            featured: true,
        },
        {
            _id: '6',
            title: 'Real-Time Chat App',
            description: 'Instant messaging application using Firebase Realtime Database with seamless UX.',
            image: 'https://via.placeholder.com/400x300?text=Chat+App',
            technologies: ['React', 'Firebase', 'TypeScript'],
            github: 'https://github.com',
            demo: 'https://chatapp.com',
            featured: false,
        },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await ProjectService.getAll();
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                console.log('Using default projects');
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
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
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
                        Featured <span className="text-accent">Projects</span>
                    </motion.h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400">Loading projects...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    variants={itemVariants}
                                    className="group bg-secondary/50 rounded-lg overflow-hidden border border-secondary hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                                >
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-blue-600/10">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/30"
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
                                                className="flex-1 px-4 py-2 bg-accent/20 text-accent hover:bg-accent hover:text-white rounded transition-colors text-sm font-medium text-center"
                                            >
                                                GitHub
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded transition-colors text-sm font-medium text-center"
                                            >
                                                Live Demo
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
