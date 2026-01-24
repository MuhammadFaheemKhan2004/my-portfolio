import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

    const menuVariants = {
        closed: { opacity: 0, y: -20 },
        open: { opacity: 1, y: 0 },
    };

    return (
        <nav className="fixed top-0 w-full bg-primary/80 backdrop-blur-md z-50 border-b border-secondary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                            MFK
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link}`}
                                className="text-gray-300 hover:text-accent transition-colors capitalize"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-300 hover:text-accent"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="md:hidden pb-4"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link}`}
                                    className="block py-2 text-gray-300 hover:text-accent transition-colors capitalize"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
