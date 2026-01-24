import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { ContactService } from '@/services/api';

const Contact = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await ContactService.sendMessage(formData);
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-center">
                        Get in <span className="text-accent">Touch</span>
                    </motion.h2>

                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                        className="bg-secondary/50 p-8 rounded-lg border border-secondary"
                    >
                        <div className="mb-6">
                            <label className="block text-gray-300 mb-2 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-primary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-primary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 mb-2 font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-primary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="Message subject"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 mb-2 font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-2 bg-primary border border-secondary rounded-lg text-white focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Your message"
                            />
                        </div>

                        {status && (
                            <div className={`mb-6 p-4 rounded-lg text-center ${status.type === 'success'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
