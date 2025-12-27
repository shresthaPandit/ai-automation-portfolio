// Portfolio data for Shrestha Pandit
export const personalInfo = {
    name: "Shrestha Pandit",
    role: "AI Automation Engineer & n8n Integration Developer",
    location: "Pilibhit, India",
    email: "shresthapandit8@gmail.com",
    github: "https://github.com/shresthaPandit",
    linkedin: "https://www.linkedin.com/in/shrestha-pandit-24bba8263",
    resume: "https://drive.google.com/file/d/1ysPLZVhFK-gENyf1eXGGKbmG-hzwDofM/view?usp=drivesdk",
    tagline: "Building intelligent automation solutions that save 1000+ hours and process 50K+ transactions monthly",
    summary: `AI Automation Engineer specializing in n8n workflow automation, API integrations, and intelligent business process automation. Built production-grade integration systems for 7+ enterprise clients including pharmaceutical giants like Combiphar and Galderma.`,
    summaryExtended: `Expert in creating zero-code/low-code automation solutions that reduce manual work by 50%+ and handle 1000+ daily transactions with 99.5% accuracy. Passionate about building systems that scale.`,
};

export const stats = [
    { number: "10", label: "Production Workflows", suffix: "+" },
    { number: "7", label: "Enterprise Clients", suffix: "+" },
    { number: "970", label: "Hours Saved/Year", suffix: "" },
    { number: "99.8", label: "Data Accuracy", suffix: "%" },
];

export const experience = {
    company: "BeatRoute Innovation Pvt. Ltd.",
    role: "Software Engineer / Integration Developer Intern",
    duration: "September 2025 - Present",
    location: "Remote",
    logo: "/beatroute-logo.svg",
    highlights: [
        {
            title: "Enterprise Integration Systems",
            description: "Engineered end-to-end integration solutions for 7+ enterprise clients (Combiphar Pharma, Galderma, Sun King, JSW, HMCL, Duroflex, GAVL)",
            metrics: ["50% reduction in manual intervention", "Automated customer master creation", "Dispatch workflows & order processing"],
        },
        {
            title: "Combiphar Pharma - Complete Data Integration System",
            description: "Built a complete pharmaceutical data integration system with 9 production workflows (273 total nodes)",
            metrics: [
                "100% data sync automation",
                "970 hours/year saved ($19,400 value)",
                "99.8% data accuracy (up from 92%)",
                "50,000+ invoices/month capacity",
            ],
            technologies: ["n8n", "PostgreSQL", "Python", "BeatRoute API", "SFTP", "Redis"],
            featured: true,
        },
        {
            title: "Python ETL & Workflow Development",
            description: "Built custom Python ETL scripts and n8n workflows to synchronize inventory data",
            metrics: ["1000+ daily transactions", "99.5% accuracy", "SFTP → PostgreSQL pipelines"],
        },
        {
            title: "API Optimization & Performance",
            description: "Optimized API workflows with caching, request throttling, and error handling",
            metrics: ["35% faster response times", "20% reduced deployment time"],
        },
    ],
    technologies: ["n8n", "PostgreSQL", "Python", "Node.js", "Redis", "RESTful APIs", "SFTP"],
};

export const projects = [
    {
        title: "Loan Eligibility Engine",
        subtitle: "AWS Serverless CSV Ingestion Stack",
        description: "Frontend CSV uploader + AWS pipeline that lands files in S3, fans out via SQS, and posts the CSV payload into an n8n workflow for downstream processing.",
        technologies: ["Python", "AWS Lambda", "S3", "SQS", "n8n", "API Gateway"],
        features: [
            "Presigned PUT URL ingestion",
            "SQS-triggered processor Lambda",
            "n8n webhook integration",
            "Static HTML/CSS/JS uploader",
            "Serverless Framework deployment",
        ],
        metrics: ["10MB file limit", "Secure presigned URLs", "Scalable fan-out architecture"],
        github: "https://github.com/shresthaPandit/Loan-Eligibility-Engine",
        demo: "https://www.loom.com/share/442ac0915e3c45d78e3924234bddcb71",
        image: "/projects/placeholder.webp",
        featured: true,
        stars: 3,
    },
    {
        title: "DailyAI Voice",
        subtitle: "Automated AI News Podcaster",
        description: "Fully automated AI news podcast generator that fetches daily AI news, generates engaging scripts, and produces professional audio content with zero manual intervention.",
        technologies: ["n8n", "Google Gemini", "Murf AI", "Supabase", "Twilio", "RAG", "Cohere"],
        features: [
            "n8n automated pipeline (scheduled)",
            "Google Gemini script generation",
            "Murf AI voice synthesis",
            "RAG with Supabase vectors",
            "WhatsApp delivery via Twilio",
        ],
        metrics: ["100+ subscribers", "10+ hrs/week saved", "Zero manual intervention"],
        github: "https://github.com/shresthaPandit/AI_PODCAST_VOICE_AGENT",
        demo: "#", // Placeholder
        image: "/projects/daily ai.png",
        featured: true,
        stars: 3,
    },
    {
        title: "Blogify",
        subtitle: "AI-Powered Blogging Platform",
        description: "Full-stack blogging platform with integrated AI writing assistant that helps users create high-quality content with real-time suggestions.",
        technologies: ["Node.js", "Express", "MongoDB", "EJS", "Google Gemini", "AWS S3"],
        features: [
            "Secure authentication",
            "AWS S3 image storage",
            "Gemini AI chatbot",
            "Real-time writing assistance",
            "SEO title generation",
        ],
        metrics: ["MVC architecture", "Mobile responsive", "Rich text editor"],
        github: "https://github.com/shresthaPandit/BLOGIFY",
        demo: "#", // Placeholder
        image: "/projects/blogify.png",
        featured: true,
        stars: 2,
    },
    {
        title: "AI Job Matching Engine",
        subtitle: "Intelligent Job Search Automation",
        description: "Intelligent job search automation tool that monitors job postings across platforms and matches them against your resume with AI-powered relevance scoring.",
        technologies: ["n8n", "Reddit API", "Email Integration", "NLP"],
        features: [
            "Multi-platform monitoring",
            "AI relevance scoring",
            "80%+ match notifications",
            "Duplicate filtering",
            "Daily digest emails",
        ],
        metrics: ["200+ jobs/day processed", "High-relevance only", "Fully automated"],
        github: null,
        demo: null,
        image: "/projects/placeholder.webp",
        featured: true,
        stars: 2,
    },
];

export const skills = {
    "AI & Automation": [
        "n8n Workflow Automation",
        "LangChain",
        "RAG Systems",
        "LLMs (Gemini, OpenAI)",
        "Chatbot Development",
        "API Integrations",
        "ETL Pipelines",
    ],
    "Languages": [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "SQL",
    ],
    "Frontend": [
        "React.js",
        "Next.js 14/15",
        "HTML5 & CSS3",
        "Tailwind CSS",
        "EJS Templates",
    ],
    "Backend": [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Microservices",
    ],
    "Databases": [
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Supabase",
        "Redis",
    ],
    "Cloud & DevOps": [
        "AWS S3",
        "Render",
        "Git & GitHub",
        "Docker",
        "CI/CD",
    ],
};

export const achievements = [
    { value: "970", label: "Hours Saved/Year", icon: "clock" },
    { value: "$19.4K", label: "Annual Cost Savings", icon: "dollar" },
    { value: "99.8%", label: "Data Accuracy", icon: "target" },
    { value: "50K+", label: "Invoices/Month", icon: "file" },
    { value: "35%", label: "API Speed Boost", icon: "zap" },
    { value: "7+", label: "Enterprise Clients", icon: "building" },
];

export const education = {
    university: "Galgotias University",
    degree: "B.Tech in Computer Science and Engineering",
    duration: "2022 - Present",
    location: "Greater Noida, India",
    coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Web Development",
        "Database Systems",
        "AI & Machine Learning",
        "Cloud Computing",
    ],
    achievement: "Completed 5+ production-ready web applications with 100% on-time delivery",
};

export const navigation = [
    { name: "Work", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];
