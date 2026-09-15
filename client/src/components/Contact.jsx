import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const WHATSAPP_NUMBER = '923079079023';
const EMAIL_ADDRESS = 'faheemniazi2004@gmail.com';

const contactInfo = [
    {
        icon: (
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.083-2.115-.499-1.815-.745-2.984-2.58-3.074-2.7-.091-.121-.743-.988-.743-1.884 0-.897.469-1.339.636-1.52.167-.182.364-.228.485-.228.121 0 .242.002.348.006.113.006.264-.043.413.315.152.364.516 1.26.562 1.351.045.091.076.197.015.318-.061.121-.091.197-.182.303-.091.106-.192.237-.274.318-.091.091-.186.19-.08.372.106.182.471.777.999 1.248.681.608 1.256.796 1.438.887.182.091.288.076.394-.045.106-.121.455-.53.576-.712.121-.182.242-.152.409-.091.167.061 1.061.5 1.243.591.182.091.303.136.348.212.045.076.045.439-.099.844z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.397C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.688 0-3.253-.518-4.555-1.405l-.326-.222-2.946.825.834-2.868-.242-.345C3.818 14.814 3.333 13.447 3.333 12c0-4.779 3.888-8.667 8.667-8.667 4.779 0 8.667 3.888 8.667 8.667 0 4.779-3.888 8.667-8.667 8.667z"/>
            </svg>
        ),
        label: 'WhatsApp',
        value: '+92 307 9079023',
        href: `https://wa.me/${WHATSAPP_NUMBER}`,
        color: 'text-mint',
        bg: 'bg-mint/8 border-mint/15',
    },
    {
        icon: (
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'Email',
        value: EMAIL_ADDRESS,
        href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=Project%20Inquiry%20-%20Portfolio`,
        color: 'text-accent',
        bg: 'bg-accent/8 border-accent/15',
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
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 4000);
    };

    const copyEmailAddress = () => {
        navigator.clipboard.writeText(EMAIL_ADDRESS);
        setCopied(true);
        showNotification('✓ Email address copied: ' + EMAIL_ADDRESS);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleWhatsAppSend = (e) => {
        if (e) e.preventDefault();
        const greeting = name.trim() ? `Hi Faheem, I'm ${name.trim()}.` : 'Hi Faheem,';
        const body = message.trim() ? ` ${message.trim()}` : " I'd like to discuss a project with you.";
        const fullText = `${greeting}${body}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleEmailSend = (e) => {
        if (e) e.preventDefault();
        const subject = name.trim() ? `Project Inquiry from ${name.trim()}` : 'Project Inquiry - Portfolio';
        const body = message.trim()
            ? `Hi Faheem,\n\n${message.trim()}\n\nBest regards,\n${name.trim() || 'A potential client'}`
            : `Hi Faheem,\n\nI'd like to discuss a project with you.\n\nBest regards,\n${name.trim() || 'A potential client'}`;

        // 1. Copy to clipboard so user always has it guaranteed
        navigator.clipboard.writeText(EMAIL_ADDRESS);
        setCopied(true);
        showNotification(`✓ Opening Gmail compose... (${EMAIL_ADDRESS} copied to clipboard)`);
        setTimeout(() => setCopied(false), 3500);

        // 2. Open Gmail Web Compose (works on every device/browser without needing desktop Outlook configured)
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
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
                        <span className="eyebrow">Get In Touch</span>
                        <h2 className="section-title mt-5">
                            Let's connect & build<br />
                            <span className="shimmer-text">something exceptional.</span>
                        </h2>
                        <p className="section-subtitle mx-auto mt-4 max-w-lg">
                            Reach out directly via WhatsApp or Email — fast response within a few hours.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        {/* Left panel — details & social */}
                        <motion.div variants={item} className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-accent">Direct Communication</p>
                                <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                                    Fast response.<br />Direct conversation.
                                </h3>

                                {/* Availability pill */}
                                <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-3.5 py-1.5 sm:px-4 sm:py-2">
                                    <span className="pulse-glow h-2 w-2 rounded-full bg-mint shrink-0" />
                                    <span className="text-[11px] sm:text-[12px] font-semibold text-mint">Available for Freelance & Full-Time Roles</span>
                                </div>

                                {/* Contact details */}
                                <div className="mt-6 sm:mt-7 space-y-3">
                                    {contactInfo.map((c) => (
                                        <div
                                            key={c.label}
                                            className={`flex items-center gap-3 sm:gap-4 rounded-xl border p-3.5 sm:p-4 ${c.bg}`}
                                        >
                                            <span className={`shrink-0 ${c.color}`}>{c.icon}</span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7b97ae]">{c.label}</p>
                                                {c.href ? (
                                                    <a
                                                        href={c.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`block truncate text-[13px] sm:text-sm font-semibold text-white transition hover:${c.color} mt-0.5`}
                                                    >
                                                        {c.value}
                                                    </a>
                                                ) : (
                                                    <p className="mt-0.5 text-[13px] sm:text-sm font-semibold text-white">{c.value}</p>
                                                )}
                                            </div>
                                            {c.label === 'Email' && (
                                                <button
                                                    type="button"
                                                    onClick={copyEmailAddress}
                                                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-[#7b97ae] transition hover:border-accent hover:text-accent shrink-0"
                                                    aria-label="Copy email"
                                                >
                                                    {copied ? '✓ Copied' : 'Copy'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="mt-6 sm:mt-8 flex gap-3">
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

                        {/* Right panel — Direct Action + Quick Composer */}
                        <motion.div variants={item} className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-mint">Instant Connect</span>
                                    <span className="text-[12px] text-[#7b97ae]">No waiting</span>
                                </div>
                                <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                                    Choose how you'd like to reach me
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-[#7b97ae]">
                                    Click below to start a conversation immediately on WhatsApp or launch your email.
                                </p>

                                {/* Notification banner */}
                                {notification && (
                                    <div className="mt-4 rounded-xl border border-mint/30 bg-mint/10 p-3 text-[12px] font-medium text-mint flex items-center justify-between">
                                        <span>{notification}</span>
                                        <a
                                            href={`mailto:${EMAIL_ADDRESS}?subject=Project%20Inquiry`}
                                            className="text-[11px] text-white underline ml-2 shrink-0 hover:text-mint"
                                        >
                                            Open Mail App
                                        </a>
                                    </div>
                                )}

                                {/* The 2 Primary Direct Action Buttons */}
                                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 w-full">
                                    {/* WhatsApp Direct Button */}
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Faheem, I'm reaching out through your portfolio to discuss a project.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-whatsapp flex-1 text-center justify-center"
                                    >
                                        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.083-2.115-.499-1.815-.745-2.984-2.58-3.074-2.7-.091-.121-.743-.988-.743-1.884 0-.897.469-1.339.636-1.52.167-.182.364-.228.485-.228.121 0 .242.002.348.006.113.006.264-.043.413.315.152.364.516 1.26.562 1.351.045.091.076.197.015.318-.061.121-.091.197-.182.303-.091.106-.192.237-.274.318-.091.091-.186.19-.08.372.106.182.471.777.999 1.248.681.608 1.256.796 1.438.887.182.091.288.076.394-.045.106-.121.455-.53.576-.712.121-.182.242-.152.409-.091.167.061 1.061.5 1.243.591.182.091.303.136.348.212.045.076.045.439-.099.844z"/>
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.397C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.688 0-3.253-.518-4.555-1.405l-.326-.222-2.946.825.834-2.868-.242-.345C3.818 14.814 3.333 13.447 3.333 12c0-4.779 3.888-8.667 8.667-8.667 4.779 0 8.667 3.888 8.667 8.667 0 4.779-3.888 8.667-8.667 8.667z"/>
                                        </svg>
                                        Chat on WhatsApp
                                    </a>

                                    {/* Email Direct Button — Guaranteed action (opens Gmail + copies email) */}
                                    <button
                                        type="button"
                                        onClick={handleEmailSend}
                                        className="btn-email-action flex-1 text-center justify-center cursor-pointer"
                                    >
                                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send an Email
                                    </button>
                                </div>

                                {/* Direct email address & Copy button */}
                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl bg-white/4 border border-white/6 p-3 sm:px-4 sm:py-2.5 text-[12px]">
                                    <span className="text-[#7b97ae] break-all sm:break-normal text-left">
                                        Email: <span className="font-semibold text-white select-all">{EMAIL_ADDRESS}</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={copyEmailAddress}
                                        className="self-start sm:self-auto inline-flex items-center gap-1 rounded-md bg-white/8 px-2.5 py-1 text-[11px] font-semibold text-accent transition hover:bg-white/15 shrink-0"
                                    >
                                        {copied ? '✓ Copied to clipboard' : '📋 Copy Address'}
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="my-5 sm:my-6 flex items-center gap-3">
                                    <span className="h-px flex-1 bg-white/8" />
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#4a6275]">
                                        Or compose a quick message
                                    </span>
                                    <span className="h-px flex-1 bg-white/8" />
                                </div>

                                {/* Optional pre-fill inputs */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className="form-label text-[12px]" htmlFor="quick-name">Your Name</label>
                                        <input
                                            id="quick-name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-input text-sm"
                                            placeholder="e.g. Sarah Jenkins"
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label text-[12px]" htmlFor="quick-message">Message / Project Brief</label>
                                        <textarea
                                            id="quick-message"
                                            rows="3"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="form-input resize-none text-sm"
                                            placeholder="Briefly describe your project scope, timeline, or question..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions with pre-filled message */}
                            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 w-full">
                                <button
                                    type="button"
                                    onClick={handleWhatsAppSend}
                                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-mint/30 bg-mint/10 py-3 px-4 text-xs font-bold uppercase tracking-wider text-mint transition-all duration-200 hover:bg-mint/20 hover:border-mint/60 cursor-pointer text-center"
                                >
                                    <span className="h-2 w-2 rounded-full bg-mint shrink-0" />
                                    Send via WhatsApp
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEmailSend}
                                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 py-3 px-4 text-xs font-bold uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent/60 cursor-pointer text-center"
                                >
                                    <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                                    Send via Email
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
