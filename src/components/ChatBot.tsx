"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Hi, I'm Shrestha. Feel free to ask me anything about my work, projects, or experience.", isUser: false },
    ]);
    const [inputValue, setInputValue] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]); // Scroll on loading state change too

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = { text: inputValue, isUser: true };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response");
            }

            if (!response.body) return;

            // Initialize bot message
            setMessages((prev) => [...prev, { text: "", isUser: false }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Stop loading animation as soon as streaming starts
                setIsLoading(false);

                const chunk = decoder.decode(value, { stream: true });
                botResponse += chunk;

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { text: botResponse, isUser: false };
                    return updated;
                });
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { text: "My bad, something crashed. Try again?", isUser: false },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isLoading) {
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#ff6b6b] text-white shadow-lg hover:bg-[#ff8e72] transition-colors"
                style={{
                    boxShadow: "0 0 20px rgba(255, 107, 107, 0.6), 0 0 40px rgba(255, 107, 107, 0.4), 0 0 60px rgba(255, 107, 107, 0.2)",
                    animation: "glow 2s ease-in-out infinite alternate"
                }}
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
                        className="fixed bottom-24 right-6 z-40 w-[350px] max-h-[500px] h-[70vh] flex flex-col bg-[#151515] border border-[#ffffff]/10 rounded-2xl shadow-2xl overflow-hidden glass-strong font-sans"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#ff6b6b]/10 border-b border-[#ffffff]/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center text-[#ff6b6b]">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Shreshtha's AI</h3>
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
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isUser
                                            ? "bg-[#ff6b6b] text-white rounded-tr-none"
                                            : "bg-[#252525] text-[var(--foreground-secondary)] rounded-tl-none border border-[#ffffff]/5"
                                            }`}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-[#ff6b6b] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                code: ({ node, className, children, ...props }) => {
                                                    const match = /language-(\w+)/.exec(className || '')
                                                    return !String(className).includes('language-') ? (
                                                        <code className="bg-black/30 rounded px-1 py-0.5 font-mono text-xs" {...props}>
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <code className="block bg-black/30 rounded p-2 font-mono text-xs overflow-x-auto" {...props}>
                                                            {children}
                                                        </code>
                                                    )
                                                }
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}

                            {/* Loading Animation */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#252525] p-4 rounded-2xl rounded-tl-none border border-[#ffffff]/5">
                                        <div className="flex gap-1.5">
                                            <motion.div
                                                className="w-2 h-2 bg-[#ff6b6b] rounded-full"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-[#ff6b6b] rounded-full"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-[#ff6b6b] rounded-full"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                    disabled={!inputValue.trim() || isLoading}
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
