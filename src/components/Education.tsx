"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, MapPin, Calendar, Award, ChevronDown, ChevronUp } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showCoursework, setShowCoursework] = useState(false);

    return (
        <section id="education" className="py-16 relative" ref={ref}>
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
                            <GraduationCap className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: Education</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Academic Background</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Education Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass rounded-lg p-5"
                >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-[#ff6b6b]">{education.university}</h3>
                            <p className="text-sm text-[var(--foreground)]">{education.degree}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-[var(--foreground-secondary)]">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {education.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {education.location}
                            </span>
                        </div>
                    </div>

                    {/* Achievement */}
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-[#ff6b6b]/5 border border-[#ff6b6b]/20 mb-4">
                        <Award className="w-4 h-4 text-[#ff6b6b] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--foreground)]">{education.achievement}</p>
                    </div>

                    {/* Coursework Toggle */}
                    <button
                        onClick={() => setShowCoursework(!showCoursework)}
                        className="flex items-center gap-1 text-xs text-[var(--foreground-secondary)] hover:text-[#ff6b6b] transition-colors"
                    >
                        {showCoursework ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {showCoursework ? "Hide" : "Show"} Coursework
                    </button>

                    {showCoursework && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2"
                        >
                            {education.coursework.map((course) => (
                                <div key={course} className="text-xs text-[var(--foreground-secondary)] flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-[#ff6b6b]" />
                                    {course}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
