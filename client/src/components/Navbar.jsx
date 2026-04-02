import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Journey' },
        { id: 'contact', label: 'Contact' },
    ];

    const menuVariants = {
        closed: { opacity: 0, y: -12, transition: { duration: 0.2 } },
        open: { opacity: 1, y: 0, transition: { duration: 0.28 } },
    };

    return (
        <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
            <div className="section-shell">
                <div className="glass-panel rounded-2xl px-4 sm:px-6">
                    <div className="flex h-16 items-center justify-between">
                        <a href="#home" className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sand text-xs font-bold text-primary">
                                MFK
                            </span>
                            <span className="hidden text-sm font-semibold uppercase tracking-[0.24em] text-slate-200 sm:inline-block">
                                Faheem Portfolio
                            </span>
                        </a>

                        <div className="hidden items-center gap-2 md:flex">
                            <a
                                href="#contact"
                                className="mr-3 rounded-full border border-sand/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sand transition hover:bg-sand/10"
                            >
                                Lets Talk
                            </a>

                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-slate-100/5 hover:text-sand"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <button
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-500/30 text-slate-300 transition hover:border-sand/50 hover:text-sand md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                                className="border-t border-slate-500/20 pb-4 pt-3 md:hidden"
                            >
                                {navLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-100/5 hover:text-sand"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
