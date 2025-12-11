"use client";

import { motion } from "framer-motion";

interface WorkflowConnectorProps {
    label: string;
}

export default function WorkflowConnector({ label }: WorkflowConnectorProps) {
    return (
        <div className="relative py-8 flex justify-center">
            {/* Vertical connecting line */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-px h-full"
                style={{
                    background: "linear-gradient(to bottom, transparent, #ff6b6b 20%, #ff8e72 80%, transparent)",
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            />

            {/* n8n-style node connector */}
            <motion.div
                className="relative z-10 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                {/* Outer glow */}
                <div className="absolute w-14 h-14 rounded-xl bg-[#ff6b6b]/10 blur-xl" />

                {/* Node box - n8n style */}
                <div className="relative w-10 h-10 rounded-lg bg-[#151515] border border-[#ff6b6b]/30 flex items-center justify-center shadow-lg">
                    {/* Connection dots - top */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ff6b6b] border-2 border-[#0c0c0c]" />

                    {/* Connection dots - bottom */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ff8e72] border-2 border-[#0c0c0c]" />

                    {/* Step number */}
                    <span className="text-xs font-mono text-[#ff8e72]">{label}</span>
                </div>
            </motion.div>

            {/* Animated data flow dots */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff6b6b]"
                animate={{
                    y: [-20, 20],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
