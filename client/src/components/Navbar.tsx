import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-md z-50 border-b border-secondary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        className="text-2xl font-bold text-accent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        MFK
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-300 hover:text-accent transition-colors duration-300"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        className="md:hidden pb-4 space-y-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2 text-gray-300 hover:text-accent transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
