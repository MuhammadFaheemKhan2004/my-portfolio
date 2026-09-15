import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const menuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.22 } },
        open: { opacity: 1, height: 'auto', transition: { duration: 0.28 } },
    };

    return (
        <nav
            className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="section-shell">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className={`glass-panel rounded-2xl px-5 transition-all duration-300 ${scrolled ? 'shadow-panel' : ''}`}
                >
                    <div className="flex h-[62px] items-center justify-between">
                        {/* Logo */}
                        <a href="#home" className="flex items-center gap-3 group" aria-label="Muhammad Faheem Khan — Home">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#e06010] text-[11px] font-black text-white tracking-wide shadow-glow-brand transition group-hover:scale-105">
                                MFK
                            </span>
                            <span className="hidden text-[13px] font-semibold tracking-widest text-slate-300 sm:block group-hover:text-white transition-colors">
                                FAHEEM
                            </span>
                        </a>

                        {/* Desktop nav */}
                        <div className="hidden items-center gap-1 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="nav-link"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden items-center md:flex">
                            <a
                                href="#contact"
                                className="btn-primary text-[11px] px-4 py-2.5 inline-flex items-center gap-2"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                                Let's Talk
                            </a>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-accent/40 hover:text-accent md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isOpen}
                        >
                            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                {isOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                                className="overflow-hidden border-t border-white/6 md:hidden"
                            >
                                <div className="flex flex-col gap-1 py-3">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href={`#${link.id}`}
                                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                    <a
                                        href="#contact"
                                        className="btn-primary mt-2 text-center inline-flex items-center justify-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                                        Let's Talk
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
