"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, navigation } from "@/lib/data";



export default function Footer() {
    const currentYear = new Date().getFullYear();

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="py-8 border-t border-[rgba(255,255,255,0.05)]">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold gradient-text">
                            {personalInfo.name.split(" ")[0]}
                        </span>
                        <span className="text-[var(--foreground-secondary)] text-sm">
                            © {currentYear}
                        </span>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="text-sm text-[var(--foreground-secondary)] hover:text-[#ff6b6b] transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[var(--foreground-secondary)] hover:text-[#ff6b6b] transition-colors"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[var(--foreground-secondary)] hover:text-[#ff6b6b] transition-colors"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="p-2 text-[var(--foreground-secondary)] hover:text-[#ff6b6b] transition-colors"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
