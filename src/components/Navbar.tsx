"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { navigation, personalInfo } from "@/lib/data";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong py-3" : "py-5"
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="text-xl font-bold gradient-text"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {personalInfo.name.split(" ")[0]}
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <motion.button
                            key={item.name}
                            onClick={() => handleNavClick(item.href)}
                            className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            {item.name}
                        </motion.button>
                    ))}
                </div>

                {/* Social Icons - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <motion.a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                    >
                        <Github size={20} />
                    </motion.a>
                    <motion.a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                    >
                        <Linkedin size={20} />
                    </motion.a>
                    <motion.a
                        href={`mailto:${personalInfo.email}`}
                        className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                    >
                        <Mail size={20} />
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[var(--foreground)] p-2"
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-strong border-t border-[var(--glass-border)]"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navigation.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleNavClick(item.href)}
                                    className="block w-full text-left text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                            <div className="flex gap-4 pt-4 border-t border-[var(--glass-border)]">
                                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                                    <Github size={20} className="text-[var(--foreground-secondary)]" />
                                </a>
                                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin size={20} className="text-[var(--foreground-secondary)]" />
                                </a>
                                <a href={`mailto:${personalInfo.email}`}>
                                    <Mail size={20} className="text-[var(--foreground-secondary)]" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
