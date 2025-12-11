"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Hi! I'm Shrestha's AI assistant. How can I help you today?", isUser: false },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);
        const userText = inputValue;
        setInputValue("");

        // Simulate bot response (placeholder for future configuration)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: "I'm currently in demo mode. My creator will configure my brain soon!", isUser: false },
            ]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/30 hover:bg-[#ff8e72] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-40 w-[350px] max-h-[500px] h-[70vh] flex flex-col bg-[#151515] border border-[#ffffff]/10 rounded-2xl shadow-2xl overflow-hidden glass-strong"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#ff6b6b]/10 border-b border-[#ffffff]/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center text-[#ff6b6b]">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                                <p className="text-xs text-[var(--foreground-secondary)] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser
                                                ? "bg-[#ff6b6b] text-white rounded-tr-none"
                                                : "bg-[#252525] text-[var(--foreground-secondary)] rounded-tl-none border border-[#ffffff]/5"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-[#ffffff]/5 bg-[#0a0a0a]/50">
                            <div className="flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-xl border border-[#ffffff]/10 focus-within:border-[#ff6b6b]/50 transition-colors">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-secondary)] focus:outline-none px-2"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 rounded-lg bg-[#ff6b6b]/20 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
