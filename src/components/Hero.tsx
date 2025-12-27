"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Download, ArrowDown, Workflow, Terminal } from "lucide-react";
import { personalInfo } from "@/lib/data";

// Typing animation for terminal effect


export default function Hero() {
    const scrollToProjects = () => {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* n8n-style connection lines in background */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                    <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0" />
                        <stop offset="50%" stopColor="#ff6b6b" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ff8e72" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 0 300 Q 200 250 400 300 T 800 280 T 1200 320 T 1600 300"
                    stroke="url(#heroLineGrad)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M 0 500 Q 300 450 600 500 T 1200 480 T 1600 500"
                    stroke="url(#heroLineGrad)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="6 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
                <div className="text-center">


                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#252525] shadow-2xl"
                    >
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* n8n-style start node */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151515] border border-[#ff6b6b]/30 mb-6"
                    >
                        <Workflow className="w-4 h-4 text-[#ff6b6b]" />
                        <span className="text-xs text-[var(--foreground-secondary)]">Start Node</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-[var(--foreground-secondary)] text-base mb-3"
                    >
                        Hi, I&apos;m {personalInfo.name.split(" ")[0]} 👋
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                    >
                        <span className="gradient-text">AI Automation</span>
                        <br />
                        <span className="text-[var(--foreground)]">Engineer</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-base text-[var(--foreground-secondary)] max-w-xl mx-auto mb-8"
                    >
                        {personalInfo.tagline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        <motion.button
                            onClick={scrollToProjects}
                            className="btn-primary text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="flex items-center gap-2">
                                View My Work
                                <ArrowDown size={14} />
                            </span>
                        </motion.button>

                        <motion.a href="#contact" className="btn-secondary text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            Get in Touch
                        </motion.a>

                        <motion.a href={personalInfo.resume} target="_blank" className="btn-secondary text-sm flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Download size={14} />
                            Resume
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[var(--foreground-secondary)]"
                >
                    <ArrowDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    );
}
