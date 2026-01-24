import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary border-t border-secondary py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <p className="text-gray-400 mb-4">
                        © {currentYear} Muhammad Faheem Khan. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                            GitHub
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                            LinkedIn
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                            Twitter
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
