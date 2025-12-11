"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Workflow, Users, Clock, Target, Play } from "lucide-react";
import { personalInfo, stats } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
    "Production Workflows": Workflow,
    "Enterprise Clients": Users,
    "Hours Saved/Year": Clock,
    "Data Accuracy": Target,
};

// Animated Counter Component
function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

    return (
        <span ref={ref} className="inline-flex items-baseline">
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
            >
                {isInView ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <CountUp end={numericValue} duration={2} />
                    </motion.span>
                ) : (
                    "0"
                )}
            </motion.span>
            <span className="text-[#ff6b6b]">{suffix}</span>
        </span>
    );
}

// Count Up Animation
function CountUp({ end, duration }: { end: number; duration: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    const isDecimal = end % 1 !== 0;

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 1 } : {}}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <CountUpNumber end={end} duration={duration} isDecimal={isDecimal} />
            </motion.span>
        </motion.span>
    );
}

function CountUpNumber({ end, duration, isDecimal }: { end: number; duration: number; isDecimal: boolean }) {
    const [count, setCount] = React.useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    React.useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = easeOutQuart * end;

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return <span ref={ref}>{isDecimal ? count.toFixed(1) : Math.floor(count)}</span>;
}

import React from "react";

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-16 relative" ref={ref}>
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
                            <Play className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: About</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">A bit about me</h2>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* About Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <p className="text-[var(--foreground-secondary)] leading-relaxed">
                            {personalInfo.summary}
                        </p>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed">
                            {personalInfo.summaryExtended}
                        </p>
                        <div className="pt-4 space-y-2">
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                📍 <span className="text-[var(--foreground)]">{personalInfo.location}</span>
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                💼 Software Engineer Intern at <span className="text-[#ff6b6b]">BeatRoute</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Grid with Animated Counters */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {stats.map((stat, index) => {
                            const Icon = iconMap[stat.label] || Workflow;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    className="glass rounded-lg p-4 card-hover"
                                >
                                    <Icon className="w-6 h-6 text-[#ff6b6b] mb-2" />
                                    <div className="text-2xl font-bold text-[var(--foreground)]">
                                        <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs text-[var(--foreground-secondary)]">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
