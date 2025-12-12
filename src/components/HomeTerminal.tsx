"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HomeTerminalProps {
    onComplete: () => void;
}

export default function HomeTerminal({ onComplete }: HomeTerminalProps) {
    const commands = [
        { text: "$ connect visitor_session", delay: 0 },
        { text: "> Connection established. Welcome! 👋", delay: 800 },
        { text: "> Launching portfolio...", delay: 1500 },
    ];

    const [currentLine, setCurrentLine] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (currentLine >= commands.length) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timeout);
        }

        const command = commands[currentLine];
        let charIndex = 0;

        const typeChar = () => {
            if (charIndex < command.text.length) {
                setCurrentText(command.text.substring(0, charIndex + 1));
                charIndex++;
                setTimeout(typeChar, 20 + Math.random() * 30);
            } else {
                setIsTyping(false);
                setTimeout(() => {
                    setCurrentLine(prev => prev + 1);
                    setCurrentText("");
                    setIsTyping(true);
                }, command.delay > 5000 ? 500 : 300);
            }
        };

        const timer = setTimeout(typeChar, 200);
        return () => clearTimeout(timer);
    }, [currentLine, commands, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-2xl px-6">
                <div className="font-mono text-sm sm:text-base bg-[#0a0a0a] border border-[#ff6b6b]/20 rounded-lg p-6 w-full shadow-2xl shadow-[#ff6b6b]/5">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="text-xs text-[var(--foreground-secondary)] ml-2">dev_terminal — -zsh — 80x24</span>
                    </div>
                    <div className="space-y-2 min-h-[200px] sm:min-h-[240px]">
                        {commands.slice(0, currentLine).map((cmd, i) => (
                            <div key={i} className={`${cmd.text.includes("Error") ? "text-red-400" : cmd.text.includes("Status") ? "text-green-400" : "text-[var(--foreground-secondary)]"}`}>
                                {cmd.text}
                            </div>
                        ))}
                        {currentLine < commands.length && (
                            <div className={`flex items-center ${commands[currentLine].text.includes("Status") ? "text-green-400" : "text-[#ff8e72]"}`}>
                                {currentText}
                                {isTyping && <span className="ml-1 w-2.5 h-5 bg-[#ff6b6b] animate-pulse" />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
