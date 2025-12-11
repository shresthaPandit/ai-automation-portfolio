"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="contact" className="py-16 relative" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">
                {/* n8n Node Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 flex items-center justify-center">
                            <Send className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: Contact</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Let&apos;s work together</h2>
                        </div>
                    </div>
                    <p className="text-sm text-[var(--foreground-secondary)] max-w-lg">
                        I&apos;m currently open to new opportunities. Feel free to reach out.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Status */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-xs text-[#ffa5a5]">
                            <span className="w-2 h-2 rounded-full bg-[#ff6b6b] animate-pulse" />
                            Open to opportunities
                        </span>
                    </div>

                    {/* Contact Grid - 3 items now */}
                    <div className="grid sm:grid-cols-3 gap-3">
                        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-4 glass rounded-lg hover:border-[#ff6b6b]/30 transition-all group">
                            <div className="w-9 h-9 rounded-md bg-[#ff6b6b]/10 flex items-center justify-center">
                                <Mail className="w-4 h-4 text-[#ff6b6b]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] text-[var(--foreground-secondary)]">Email</p>
                                <p className="text-xs text-[var(--foreground)] truncate group-hover:text-[#ffa5a5] transition-colors">
                                    {personalInfo.email}
                                </p>
                            </div>
                        </a>

                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 glass rounded-lg hover:border-[#ff6b6b]/30 transition-all group">
                            <div className="w-9 h-9 rounded-md bg-[#ff6b6b]/10 flex items-center justify-center">
                                <Linkedin className="w-4 h-4 text-[#ff6b6b]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--foreground-secondary)]">LinkedIn</p>
                                <p className="text-xs text-[var(--foreground)] group-hover:text-[#ffa5a5] transition-colors">Connect</p>
                            </div>
                        </a>

                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 glass rounded-lg hover:border-[#ff6b6b]/30 transition-all group">
                            <div className="w-9 h-9 rounded-md bg-[#ff6b6b]/10 flex items-center justify-center">
                                <Github className="w-4 h-4 text-[#ff6b6b]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--foreground-secondary)]">GitHub</p>
                                <p className="text-xs text-[var(--foreground)] group-hover:text-[#ffa5a5] transition-colors">View work</p>
                            </div>
                        </a>
                    </div>

                    {/* Location */}
                    <div className="mt-5 flex items-center gap-2 text-[var(--foreground-secondary)] text-xs">
                        <MapPin className="w-3 h-3" />
                        {personalInfo.location}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
