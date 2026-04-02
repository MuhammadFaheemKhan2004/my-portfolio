import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
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
        <section id="contact" className="py-16 sm:py-20">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemVariants} className="mb-10 text-center">
                        <span className="eyebrow">Contact</span>
                        <h2 className="section-title mt-4">Let us turn your idea into a polished product.</h2>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <motion.div variants={itemVariants} className="glass-panel rounded-3xl p-7 sm:p-8">
                            <p className="text-sm uppercase tracking-[0.16em] text-sand">Open for collaborations</p>
                            <h3 className="mt-3 text-3xl font-bold text-slate-100">Build a standout digital experience.</h3>
                            <p className="mt-4 text-sm leading-relaxed text-slate-300">
                                Share your vision, timeline, and goals. I will help shape it into a product that feels premium, performs fast, and leaves a strong impression.
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="rounded-xl border border-sand/25 bg-primary/40 p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Email</p>
                                    <a href="mailto:faheemniazi2004@gmail.com" className="text-sm font-semibold text-slate-100 hover:text-sand">
                                        faheemniazi2004@gmail.com
                                    </a>
                                </div>
                                <div className="rounded-xl border border-sand/25 bg-primary/40 p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Phone</p>
                                    <a href="tel:+923079079023" className="text-sm font-semibold text-slate-100 hover:text-sand">
                                        +92 307 9079023
                                    </a>
                                </div>
                                <div className="rounded-xl border border-sand/25 bg-primary/40 p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Location</p>
                                    <p className="text-sm font-semibold text-slate-100">Islamabad, Pakistan</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form
                            variants={itemVariants}
                            onSubmit={handleSubmit}
                            className="glass-panel rounded-3xl p-7 sm:p-8"
                        >
                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-400/35 bg-primary/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sand"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-400/35 bg-primary/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sand"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-400/35 bg-primary/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sand"
                                    placeholder="Project type or brief"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full resize-none rounded-xl border border-slate-400/35 bg-primary/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sand"
                                    placeholder="Tell me about your goals, timeline, and expected features"
                                />
                            </div>

                            {status && (
                                <div
                                    className={`mb-6 rounded-xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-mint/35 bg-mint/10 text-mint' : 'border-red-400/35 bg-red-500/10 text-red-300'}`}
                                >
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
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
