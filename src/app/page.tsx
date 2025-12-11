"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WorkflowConnector from "@/components/WorkflowConnector";
import HomeTerminal from "@/components/HomeTerminal";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);

  return (
    <main className="min-h-screen bg-[var(--background)] relative">
      <AnimatePresence>
        {showTerminal && (
          <HomeTerminal onComplete={() => setShowTerminal(false)} />
        )}
      </AnimatePresence>

      {!showTerminal && (
        <>
          {/* Background workflow lines */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <svg className="w-full h-full opacity-20">
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0" />
                  <stop offset="20%" stopColor="#ff6b6b" stopOpacity="0.5" />
                  <stop offset="80%" stopColor="#ff8e72" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff8e72" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Main vertical flow line */}
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#flowGradient)" strokeWidth="1" strokeDasharray="8 4" />
              {/* Left branch */}
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#flowGradient)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
              {/* Right branch */}
              <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#flowGradient)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
            </svg>
          </div>

          <Navbar />

          <div className="relative z-10">
            {/* Hero - Start Node */}
            <Hero />

            {/* Connector: Hero → Projects */}
            <WorkflowConnector label="01" />

            {/* Projects Section */}
            <Projects />

            {/* Connector: Projects → Experience */}
            <WorkflowConnector label="02" />

            {/* Experience Section */}
            <Experience />

            {/* Connector: Experience → Skills */}
            <WorkflowConnector label="03" />

            {/* Skills Section */}
            <Skills />

            {/* Connector: Skills → Achievements */}
            <WorkflowConnector label="04" />

            {/* Achievements Section */}
            <Achievements />

            {/* Connector: Achievements → About */}
            <WorkflowConnector label="05" />

            {/* About Section */}
            <About />

            {/* Connector: About → Education */}
            <WorkflowConnector label="06" />

            {/* Education Section */}
            <Education />

            {/* Connector: Education → Contact */}
            <WorkflowConnector label="07" />

            {/* Contact - End Node */}
            <Contact />
          </div>

          <Footer />
          <ChatBot />
        </>
      )}
    </main>
  );
}
