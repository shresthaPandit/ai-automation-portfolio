import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shrestha Pandit | AI Automation Engineer & n8n Integration Developer",
  description: "AI Automation Engineer specializing in n8n workflow automation, API integrations, and intelligent business process automation. Built production-grade integration systems for 7+ enterprise clients.",
  keywords: [
    "AI Automation",
    "n8n Developer",
    "Integration Developer",
    "Workflow Automation",
    "API Integrations",
    "ETL Pipelines",
    "Node.js",
    "Python",
    "PostgreSQL",
  ],
  authors: [{ name: "Shrestha Pandit" }],
  creator: "Shrestha Pandit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shresthapandit.com",
    title: "Shrestha Pandit | AI Automation Engineer",
    description: "Building intelligent automation solutions that save 1000+ hours and process 50K+ transactions monthly",
    siteName: "Shrestha Pandit Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrestha Pandit | AI Automation Engineer",
    description: "Building intelligent automation solutions that save 1000+ hours and process 50K+ transactions monthly",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
