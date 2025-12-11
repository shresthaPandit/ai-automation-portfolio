"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign, Target, FileText, Zap, Building, TrendingUp } from "lucide-react";
import { achievements } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
    clock: Clock,
    dollar: DollarSign,
    target: Target,
    file: FileText,
    zap: Zap,
    building: Building,
};

export default function Achievements() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="py-16 relative" ref={ref}>
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
                            <TrendingUp className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: Impact</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Key Achievements</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {achievements.map((achievement, index) => {
                        const Icon = iconMap[achievement.icon] || TrendingUp;
                        return (
                            <motion.div
                                key={achievement.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="glass rounded-lg p-4 card-hover text-center"
                            >
                                <Icon className="w-5 h-5 text-[#ff6b6b] mx-auto mb-2" />
                                <div className="text-xl font-bold text-[var(--foreground)]">
                                    {achievement.value}
                                </div>
                                <div className="text-xs text-[var(--foreground-secondary)]">
                                    {achievement.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
