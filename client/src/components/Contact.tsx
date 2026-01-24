import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ContactService } from '@/services/api';

const Contact: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await ContactService.sendMessage(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send message. Please try again.');
            setTimeout(() => setError(null), 5000);
        } finally {
            setLoading(false);
        }
    };

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
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
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
                        Get In <span className="text-accent">Touch</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-8"
                        >
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                                <p className="text-gray-400 mb-8">
                                    Have a project in mind? Let's discuss it! I'm always open to new opportunities and collaborations.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-accent mt-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <a href="mailto:faheemniazi2004@gmail.com" className="text-gray-400 hover:text-accent transition-colors">
                                            faheemniazi2004@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="text-accent mt-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <a href="tel:+923079079023" className="text-gray-400 hover:text-accent transition-colors">
                                            +92 307 9079023
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="text-accent mt-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Location</p>
                                        <p className="text-gray-400">Islamabad, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.form
                            variants={itemVariants}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {success && (
                                <div className="p-4 bg-green-500/10 border border-green-500/50 text-green-400 rounded-lg">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-secondary/50 border border-secondary focus:border-accent outline-none rounded-lg transition-colors placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-secondary/50 border border-secondary focus:border-accent outline-none rounded-lg transition-colors placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-secondary/50 border border-secondary focus:border-accent outline-none rounded-lg transition-colors placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-secondary/50 border border-secondary focus:border-accent outline-none rounded-lg transition-colors placeholder-gray-500 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-accent hover:bg-accent-hover disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
