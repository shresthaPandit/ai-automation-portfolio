"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, MouseEvent } from "react";
import { ExternalLink, Github, FolderGit2, Mic, PenTool, Briefcase, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";

// Project-specific icons with vibrant but balanced colors
const projectStyles: Record<string, { icon: React.ElementType; bg: string; iconBg: string; iconColor: string; label: string }> = {
    "DailyAI Voice": {
        icon: Mic,
        bg: "bg-gradient-to-br from-[#ff6b6b]/40 via-[#ff8e72]/30 to-[#ff6b6b]/20",
        iconBg: "bg-gradient-to-br from-[#ff6b6b] to-[#ff8e72]",
        iconColor: "white",
        label: "AI Voice Agent"
    },
    "Blogify": {
        icon: PenTool,
        bg: "bg-gradient-to-br from-[#ff8e72]/40 via-[#ffa5a5]/30 to-[#ff6b6b]/20",
        iconBg: "bg-gradient-to-br from-[#ff8e72] to-[#ffa5a5]",
        iconColor: "white",
        label: "Full-Stack Web App"
    },
    "AI Job Matching Engine": {
        icon: Briefcase,
        bg: "bg-gradient-to-br from-[#ff5555]/40 via-[#ff6b6b]/30 to-[#ff8e72]/20",
        iconBg: "bg-gradient-to-br from-[#ff5555] to-[#ff6b6b]",
        iconColor: "white",
        label: "n8n Automation"
    },
    "Coming Soon": {
        icon: Sparkles,
        bg: "bg-gradient-to-br from-[#ffa5a5]/40 via-[#ff8e72]/30 to-[#ff6b6b]/20",
        iconBg: "bg-gradient-to-br from-[#ffa5a5] to-[#ff8e72]",
        iconColor: "white",
        label: "New Project"
    },
};

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const springConfig = { stiffness: 300, damping: 30 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        setRotateX(-mouseY / 15);
        setRotateY(mouseX / 15);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-16 relative" ref={ref}>
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
                            <FolderGit2 className="w-5 h-5 text-[#ff6b6b]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#ff8e72] font-mono uppercase tracking-wider">Node: Projects</p>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Selected Work</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Projects Grid with 3D Tilt */}
                <div className="grid sm:grid-cols-2 gap-5" style={{ perspective: "1000px" }}>
                    {projects.map((project, index) => {
                        const style = projectStyles[project.title] || projectStyles["Coming Soon"];
                        const Icon = style.icon;

                        return (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <TiltCard className="glass rounded-lg overflow-hidden card-hover group cursor-pointer">
                                    {/* Vibrant gradient cover */}
                                    <div className={`relative h-36 ${style.bg} overflow-hidden`} style={{ transform: "translateZ(20px)" }}>
                                        {/* Decorative elements */}
                                        <div className="absolute inset-0">
                                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
                                            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5 blur-2xl" />
                                        </div>

                                        {/* Icon with solid gradient background */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.div
                                                className={`w-14 h-14 rounded-xl ${style.iconBg} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                                style={{ transform: "translateZ(40px)" }}
                                                whileHover={{ rotate: 5 }}
                                            >
                                                <Icon className="w-7 h-7 text-white" />
                                            </motion.div>
                                        </div>

                                        {/* Label */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10">
                                                {style.label}
                                            </span>
                                        </div>

                                        {/* Links */}
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 backdrop-blur rounded-md text-white/90 hover:bg-white/20 transition-colors">
                                                    <Github size={14} />
                                                </a>
                                            )}
                                            {project.demo && project.demo !== "#" && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 backdrop-blur rounded-md text-white/90 hover:bg-white/20 transition-colors">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4" style={{ transform: "translateZ(10px)" }}>
                                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">{project.title}</h3>
                                        <p className="text-xs text-[#ff8e72] mb-2">{project.subtitle}</p>
                                        <p className="text-xs text-[var(--foreground-secondary)] mb-3 line-clamp-2">{project.description}</p>

                                        {/* Tech */}
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 4).map((tech) => (
                                                <span key={tech} className="tech-badge text-[10px]">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
