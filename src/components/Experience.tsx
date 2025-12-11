"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, Star, Building2 } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    return (
        <section id="experience" className="py-16 relative" ref={ref}>
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
                            <Building2 className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: Experience</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Where I&apos;ve worked</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass rounded-lg p-6"
                >
                    {/* Company Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                        <div>
                            <h3 className="text-lg font-bold text-[var(--foreground)]">{experience.company}</h3>
                            <p className="text-[#ff6b6b]">{experience.role}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-[var(--foreground-secondary)]">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {experience.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {experience.location}
                            </span>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3">
                        {experience.highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className={`rounded-lg overflow-hidden ${highlight.featured
                                        ? "bg-[#ff6b6b]/5 border border-[#ff6b6b]/20"
                                        : "bg-[#151515]"
                                    }`}
                            >
                                <button
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    className="w-full p-3 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        {highlight.featured && <Star className="w-4 h-4 text-[#ff6b6b] fill-current" />}
                                        <Briefcase className="w-4 h-4 text-[var(--foreground-secondary)]" />
                                        <span className="text-sm font-medium text-[var(--foreground)]">{highlight.title}</span>
                                    </div>
                                    {expandedIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                {expandedIndex === index && (
                                    <div className="px-3 pb-3">
                                        <p className="text-xs text-[var(--foreground-secondary)] mb-3 pl-6">{highlight.description}</p>
                                        <ul className="grid sm:grid-cols-2 gap-1 pl-6 mb-3">
                                            {highlight.metrics.map((metric, i) => (
                                                <li key={i} className="flex items-center gap-2 text-xs text-[var(--foreground-secondary)]">
                                                    <span className="w-1 h-1 rounded-full bg-[#ff6b6b]" />
                                                    {metric}
                                                </li>
                                            ))}
                                        </ul>
                                        {highlight.technologies && (
                                            <div className="pl-6 flex flex-wrap gap-1">
                                                {highlight.technologies.map((tech) => (
                                                    <span key={tech} className="tech-badge text-[10px]">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
