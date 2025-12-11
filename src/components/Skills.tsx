"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2 } from "lucide-react";
import { skills } from "@/lib/data";

const categories = Object.keys(skills) as (keyof typeof skills)[];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState<keyof typeof skills>("AI & Automation");

    return (
        <section id="skills" className="py-16 relative" ref={ref}>
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
                            <Code2 className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: Skills</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Technologies I use</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-6"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeCategory === category
                                    ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e72] text-white"
                                    : "glass text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-lg p-5"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {skills[activeCategory].map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.03 }}
                                className="p-3 rounded-lg bg-[#151515] border border-[rgba(255,255,255,0.03)] hover:border-[#ff6b6b]/30 transition-all group"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b] group-hover:scale-150 transition-transform" />
                                    <span className="text-xs text-[var(--foreground)] group-hover:text-[#ffa5a5] transition-colors">{skill}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
