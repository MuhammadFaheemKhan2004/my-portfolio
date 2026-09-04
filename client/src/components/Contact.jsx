import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ContactService } from '@/services/api';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const contactInfo = [
    {
        icon: (
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'Email',
        value: 'faheemniazi2004@gmail.com',
        href: 'mailto:faheemniazi2004@gmail.com',
        color: 'text-accent',
        bg: 'bg-accent/8 border-accent/15',
    },
    {
        icon: (
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        label: 'Phone',
        value: '+92 307 9079023',
        href: 'tel:+923079079023',
        color: 'text-mint',
        bg: 'bg-mint/8 border-mint/15',
    },
    {
        icon: (
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: 'Location',
        value: 'Islamabad, Pakistan',
        href: null,
        color: 'text-violet',
        bg: 'bg-violet/8 border-violet/15',
    },
];

const Contact = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            await ContactService.sendMessage(formData);
            setStatus({ type: 'success', message: '✓ Message sent! I\'ll get back to you shortly.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setStatus({ type: 'error', message: '✕ Something went wrong. Please try again or email me directly.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 sm:py-24">
            <div className="section-shell">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={item} className="mb-14 text-center">
                        <span className="eyebrow">Contact</span>
                        <h2 className="section-title mt-5">
                            Let's turn your idea into<br />
                            <span className="shimmer-text">a polished product.</span>
                        </h2>
                        <p className="section-subtitle mx-auto mt-4 max-w-lg">
                            Share your vision and timeline — I'll help shape it into something exceptional.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        {/* Left panel — info */}
                        <motion.div variants={item} className="glass-panel rounded-3xl p-8">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-accent">Open for collaboration</p>
                            <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-[1.75rem] leading-tight">
                                Build something<br />standout together.
                            </h3>

                            {/* Availability pill */}
                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-4 py-2">
                                <span className="pulse-glow h-2 w-2 rounded-full bg-mint" />
                                <span className="text-[12px] font-semibold text-mint">Currently accepting projects</span>
                            </div>

                            {/* Contact details */}
                            <div className="mt-7 space-y-3">
                                {contactInfo.map((c) => (
                                    <div
                                        key={c.label}
                                        className={`flex items-center gap-4 rounded-xl border p-4 ${c.bg}`}
                                    >
                                        <span className={`shrink-0 ${c.color}`}>{c.icon}</span>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7b97ae]">{c.label}</p>
                                            {c.href ? (
                                                <a
                                                    href={c.href}
                                                    className={`block truncate text-sm font-semibold text-white transition hover:${c.color} mt-0.5`}
                                                >
                                                    {c.value}
                                                </a>
                                            ) : (
                                                <p className="mt-0.5 text-sm font-semibold text-white">{c.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social links */}
                            <div className="mt-6 flex gap-3">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-github flex-1 justify-center"
                                    aria-label="GitHub profile"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost flex-1 justify-center"
                                    aria-label="LinkedIn profile"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        </motion.div>

                        {/* Right panel — form */}
                        <motion.form
                            variants={item}
                            onSubmit={handleSubmit}
                            className="glass-panel rounded-3xl p-8"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="form-label" htmlFor="contact-name">Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="form-label" htmlFor="contact-subject">Subject</label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Project type or brief"
                                />
                            </div>

                            <div className="mt-5">
                                <label className="form-label" htmlFor="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="form-input resize-none"
                                    placeholder="Tell me about your goals, timeline, and expected features..."
                                />
                            </div>

                            {status && (
                                <div
                                    className={`mt-5 rounded-xl border px-4 py-3 text-[13px] font-medium ${
                                        status.type === 'success'
                                            ? 'border-mint/25 bg-mint/8 text-mint'
                                            : 'border-red-400/25 bg-red-500/8 text-red-400'
                                    }`}
                                    role="alert"
                                >
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                id="contact-submit"
                                className="btn-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
