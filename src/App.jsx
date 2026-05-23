import React, { useState } from "react";
import {
  Award,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Star,
  TrendingUp,
  Menu,
  X
} from "lucide-react";

const profile = {
  name: "Durga Prasad",
  role: "Data Science & AI-focused CSE Student",
  location: "Dakshina Kannada, Karnataka",
  email: "prasadshetty1275@gmail.com",
  github: "https://github.com/shettyprasad-git",
  linkedin: "https://www.linkedin.com/in/durgaprasadshetty/",
  resume: "https://drive.google.com/file/d/1QyW-NaA0tixH7v90j55JxLr5JRAu2HIM/view?usp=sharing",
  avatar: "/profile-avatar.jpg",
  summary:
    "Computer Science and Data Science Engineering student building practical machine learning, analytics, and AI-assisted web projects with Python, SQL, Power BI, Tableau, React, and Node.js.",
  education: [
    {
      school: "CMR University, Bangalore",
      program: "B.Tech in Computer Science and Data Science Engineering",
      result: "CGPA 8.65/10",
      period: "Mar 2023 - Present"
    },
    {
      school: "Excel Pre-University College, Mangalore",
      program: "PUC, Science (PCMC), Karnataka State Board",
      result: "89.5%",
      period: "Completed 2023"
    },
    {
      school: "VANI English Medium School, Mangalore",
      program: "Xth, Karnataka State Board",
      result: "90.24%",
      period: "Completed 2021"
    }
  ]
};

const metrics = [
  { label: "Public GitHub Repos", value: "16", detail: "AI, MERN, ML, SQL, BI" },
  { label: "Current Internships", value: "2", detail: "Data Science + Data Analytics" },
  { label: "Academic CGPA", value: "8.65", detail: "CSE & Data Science" },
  { label: "Project Tracks", value: "4", detail: "ML, BI, SQL, full-stack AI" }
];

const internships = [
  {
    company: "KodNest Technologies",
    role: "Data Science Internship, Free Intern Learning Track",
    internId: "KOD8HIW3D",
    timeline: "Jan 2026 - Present",
    description:
      "Flexible learning-track internship focused on structured industry exposure, guided modules, and practical preparation across AI-assisted development and data workflows.",
    learnings: ["Agentic Development", "Python with AI", "SQL for analysis", "Data Science workflow", "Frontend project building"],
    tools: ["Python", "SQL", "Data Science", "MERN Frontend", "AI-assisted development"]
  },
  {
    company: "ApexPlanet Software Pvt. Ltd.",
    role: "Data Analytics Intern",
    internId: "APSPL2635005",
    timeline: "May 2026 - Present",
    description:
      "Project-oriented analytics internship designed to build hands-on experience with data analysis tasks, business insight generation, and professional reporting.",
    learnings: ["Data analytics project execution", "Business insights", "Reporting discipline", "Analytical communication"],
    tools: ["Data Analytics", "Excel", "SQL concepts", "Dashboards", "Business reporting"]
  }
];

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "SQL", "R", "C", "C++", "HTML", "CSS", "JavaScript"]
  },
  {
    title: "Data Science & ML",
    icon: BrainCircuit,
    skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Regression", "Classification", "EDA", "Feature Engineering", "Model Evaluation"]
  },
  {
    title: "BI & Analytics",
    icon: BarChart3,
    skills: ["Power BI", "Tableau", "Microsoft Excel", "Dashboards", "KPI Analysis", "Data Cleaning", "Data Preprocessing"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "MongoDB", "SQL Analysis", "Data Modeling"]
  },
  {
    title: "Web & MERN Stack",
    icon: Sparkles,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Vite", "Tailwind CSS", "JWT Authentication", "REST APIs"]
  },
  {
    title: "AI Tools",
    icon: Star,
    skills: ["Hugging Face", "AI Chatbots", "Agentic Development", "Prompted Workflows", "Streamlit", "IBM Watson Studio", "Streamlit Cloud"]
  }
];

const featuredProjects = [
  {
    name: "FlowPilot AI",
    type: "AI-powered MERN productivity workspace",
    description:
      "Built a full-stack productivity platform with smart tasks, notes, email generation, workflow planning, JWT auth, MongoDB, and Hugging Face AI integration.",
    stack: ["React", "Node.js", "MongoDB", "JWT", "Hugging Face"],
    repo: "https://github.com/shettyprasad-git/FlowPilot-AI",
    live: "https://flow-pilot-ai-app.vercel.app/",
    highlight: "Full-stack AI"
  },
  {
    name: "AI-Hub",
    type: "Open-source AI chatbot interface",
    description:
      "Created a ChatGPT-style AI chatbot with React, Vite, serverless backend behavior, customizable AI responses, and a polished glass UI.",
    stack: ["React", "Vite", "Hugging Face", "Serverless"],
    repo: "https://github.com/shettyprasad-git/AI-Hub",
    live: "https://ai-hub-fawn.vercel.app/",
    highlight: "AI interface"
  },
  {
    name: "SmartLearn AI LMS",
    type: "AI-powered learning management system",
    description:
      "Developed an LMS concept using YouTube course content, Next.js, Node.js, and MySQL to support structured AI-assisted learning.",
    stack: ["Next.js", "Node.js", "MySQL", "TypeScript"],
    repo: "https://github.com/shettyprasad-git/SmartLearn-AI-LMS",
    live: "https://smart-learn-ai-lms.vercel.app",
    highlight: "EdTech AI"
  },
  {
    name: "Credit Card Fraud Detection",
    type: "Machine learning classification project",
    description:
      "Built a supervised fraud detection pipeline on imbalanced transaction data with preprocessing, scaling, model training, and ROC-AUC style evaluation.",
    stack: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
    repo: "https://github.com/shettyprasad-git/Credit-Card-Fraud-Detection",
    highlight: "ML classification"
  },
  {
    name: "Bangalore House Price Prediction",
    type: "Regression model with Streamlit app",
    description:
      "Performed EDA, cleaning, feature engineering, model serialization, and deployment for a housing price predictor based on location and property features.",
    stack: ["Python", "Scikit-learn", "Streamlit", "NumPy"],
    repo: "https://github.com/shettyprasad-git/Bangalore-House-Price-Prediction",
    live: "https://bangalorehousepriceprediction-prasadshetty.streamlit.app/",
    highlight: "ML deployment"
  },
  {
    name: "Sales Insights Data Analysis",
    type: "SQL and Power BI analytics project",
    description:
      "Analyzed sales data with SQL and transformed findings into dashboard-ready KPIs for business trend analysis and decision support.",
    stack: ["SQL", "Power BI", "Data Cleaning", "Dashboards"],
    repo: "https://github.com/shettyprasad-git/sales-insights-data-analysis",
    highlight: "BI analytics"
  },
  {
    name: "Pizza Sales SQL Analysis",
    type: "End-to-end SQL analysis",
    description:
      "Used SQL to analyze orders, revenue, customer behavior, aggregation patterns, and sales trends across basic to advanced query levels.",
    stack: ["SQL", "Aggregation", "Segmentation", "Trend Analysis"],
    repo: "https://github.com/shettyprasad-git/pizza-sales-sql-analysis",
    highlight: "SQL depth"
  },
  {
    name: "Ferns and Petals Sales Analysis",
    type: "Excel sales dashboard",
    description:
      "Created an Excel-based sales analysis workflow with functions, pivots, charts, and KPI dashboards for revenue and performance tracking.",
    stack: ["Excel", "Pivot Tables", "Charts", "KPI Analysis"],
    repo: "https://github.com/shettyprasad-git/Ferns-and-Petals-Sales-Analysis",
    highlight: "Excel BI"
  }
];

const moreProjects = [
  {
    name: "kodbank",
    description: "Banking web app with React, Node.js, MySQL, JWT auth, dashboard UI, and AI customer support chatbot.",
    repo: "https://github.com/shettyprasad-git/kodbank",
    live: "https://kodbank-sigma.vercel.app/",
    language: "JavaScript"
  },
  {
    name: "Entertainment-kit",
    description: "Entertainment platform clone with TMDB integration, auth, React, Tailwind, Node.js, and cloud watchlist features.",
    repo: "https://github.com/shettyprasad-git/Entertainment-kit",
    live: "https://entertainment-kit.vercel.app",
    language: "JavaScript"
  },
  {
    name: "Wedding Expense Tracker",
    description: "Responsive JavaScript expense tracker deployed on Vercel for structured event budget management.",
    repo: "https://github.com/shettyprasad-git/Wedding-Expense-Tracker",
    live: "https://weddingexpense.vercel.app",
    language: "JavaScript"
  },
  {
    name: "Job Ecosystem",
    description: "TypeScript web project exploring job ecosystem flows and application-style user experiences.",
    repo: "https://github.com/shettyprasad-git/Job_Ecosystem",
    live: "https://job-ecosystem.vercel.app",
    language: "TypeScript"
  },
  {
    name: "Weather App",
    description: "React weather dashboard using Weatherstack API for current and historical weather data with filters.",
    repo: "https://github.com/shettyprasad-git/weather-app",
    live: "https://weatherbyprasad.vercel.app/",
    language: "JavaScript"
  },
  {
    name: "Sales Prediction Using Python",
    description: "Regression project forecasting sales from advertising data with EDA, visualization, and Streamlit delivery.",
    repo: "https://github.com/shettyprasad-git/Sales-Prediction-Using-Python",
    live: "https://salespredictionusingpython.streamlit.app/",
    language: "Jupyter Notebook"
  },
  {
    name: "Titanic Survival Prediction",
    description: "Classification project with preprocessing, feature engineering, missing-value handling, and model validation.",
    repo: "https://github.com/shettyprasad-git/Titanic-Survival-Prediction",
    live: "https://titanicsurvivalprediction-prasadshetty.streamlit.app/",
    language: "Jupyter Notebook"
  },
  {
    name: "GitHub Profile README",
    description: "Personal GitHub profile repository for public developer profile presentation.",
    repo: "https://github.com/shettyprasad-git/shettyprasad-git",
    language: "Profile"
  }
];

const experiences = [
  {
    title: "PwC Switzerland Power BI Job Simulation",
    organization: "Forage",
    period: "Sep 2024",
    points: [
      "Created Power BI dashboards to communicate KPIs for business decision-making.",
      "Analyzed HR data and gender-related executive management KPIs.",
      "Delivered concise insights and actionable recommendations."
    ]
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    organization: "Forage",
    period: "Jan 2026",
    points: [
      "Completed a simulation involving data analysis and forensic technology tasks.",
      "Built Tableau dashboards to visualize business metrics and trends.",
      "Used Excel to classify data, analyze patterns, and draw business conclusions."
    ]
  }
];

const certifications = [
  {
    name: "What is Data Science?",
    issuer: "IBM / Coursera",
    period: "Sep 2025",
    link: "https://www.coursera.org/account/accomplishments/records/3S82860UDF6M",
    skills: ["Data science roles", "Analytics lifecycle", "Business problem framing"]
  },
  {
    name: "Getting Started with Data",
    issuer: "IBM",
    period: "Oct 2025",
    link: "https://www.credly.com/badges/1ea5cd3e-0956-41a2-a9e0-c39a5c8cd677/linked_in_profile",
    skills: ["Data basics", "Data sources", "Data-driven decisions"]
  },
  {
    name: "Data Fundamentals",
    issuer: "IBM",
    period: "Oct 2025",
    link: "https://www.credly.com/badges/71eb5cdb-19c1-4256-8e42-92632f20f63d/linked_in_profile",
    skills: ["Data literacy", "Data quality", "Analytics foundations"]
  },
  {
    name: "Data Science Foundations - Level 1",
    issuer: "IBM",
    period: "Oct 2025",
    link: "https://www.credly.com/badges/392c3df3-5b8b-47b0-8e07-395c36da5bdd/linked_in_profile",
    skills: ["Data science methodology", "Modeling concepts", "Applied analytics"]
  },
  {
    name: "Data Science Methodologies",
    issuer: "IBM",
    period: "Oct 2025",
    link: "https://www.credly.com/badges/276addf1-811e-4b9c-82b1-dab697fe0855/linked_in_profile",
    skills: ["CRISP-style workflows", "Problem definition", "Evaluation planning"]
  },
  {
    name: "Data Science Tools",
    issuer: "IBM",
    period: "Oct 2025",
    link: "https://www.credly.com/badges/b9a3c8a5-f5cb-4a4a-8bab-4bdd9865d11c/linked_in_profile",
    skills: ["Jupyter", "IBM Watson Studio", "Open-source tooling"]
  },
  {
    name: "Data Science Foundations - Level 2 (V2)",
    issuer: "IBM",
    period: "Oct 2025",
    link: "https://www.credly.com/badges/4ebd5893-92e4-4be0-9afc-9939f6f0abdf/linked_in_profile",
    skills: ["Machine learning basics", "Data preparation", "Model interpretation"]
  },
  {
    name: "Python for Data Science",
    issuer: "Udemy",
    period: "Sep 2025",
    link: "https://www.udemy.com/certificate/UC-ec6274c0-0b6e-4c46-a099-4440ee98ad8e/",
    skills: ["Python programming", "Data analysis basics", "Practical notebook workflows"]
  },
  {
    name: "Data Analyst Bootcamp",
    issuer: "Alex The Analyst",
    period: "Aug 2025",
    link: "https://www.youtube.com/@AlexTheAnalyst",
    skills: ["Excel analytics", "SQL foundations", "Portfolio project workflow"]
  }
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Internships", href: "#internships" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" }
];

function App() {
  return (
    <div className="min-h-screen bg-[#f7f8f4] text-[#17221f]">
      <HeaderNav />
      <main>
        <Hero />
        <About />
        <Internships />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#17221f]/10 bg-[#f7f8f4]/90 backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto max-w-7xl px-3 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Mobile hamburger menu & logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#17221f]/10 bg-white/50 text-[#17221f] transition-all hover:bg-white lg:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <a href="#top" className="flex items-center gap-2 sm:gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#17221f] text-xs font-black text-white sm:h-10 sm:w-10 sm:text-sm">
                DP
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#17221f] sm:text-sm sm:font-bold sm:tracking-[0.16em]">
                Durga Prasad
              </span>
            </a>
          </div>

          {/* Desktop navigation menu */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          {/* Resume button */}
          <div>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="small-button text-xs py-1.5 px-2.5 sm:text-sm sm:py-2 sm:px-3">
              <FileText size={15} className="sm:w-4 sm:h-4" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#17221f]/10 pt-3 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-lg bg-white/50 border border-[#17221f]/5 px-3 py-2.5 text-center text-xs font-black uppercase tracking-wider text-[#465752] transition-colors hover:bg-[#17221f]/5 hover:text-[#17221f] active:bg-[#17221f]/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="portfolio-hero">
      <div className="hero-window mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="hero-window-bar">
          <button className="hero-menu-button" aria-label="Open portfolio menu">
            <span />
            <span />
            <span />
          </button>
          <div className="hero-window-title">
            <span className="control-dot bg-[#ff5f57]" />
            <span className="control-dot bg-[#febc2e]" />
            <span className="control-dot bg-[#28c840]" />
            <strong>Portfolio Preview</strong>
          </div>
          <span className="hero-window-mode">DATA / AI</span>
        </div>
        <div className="hero-window-body grid min-h-[calc(84vh-68px)] items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            Data Science, Analytics, AI and MERN Projects
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-[#17221f] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-2xl text-2xl font-semibold text-[#31544f] sm:text-3xl">{profile.role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#465752]">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="primary-button" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={19} />
              GitHub
            </a>
            <a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={19} />
              LinkedIn
            </a>
            <a className="secondary-button" href={profile.resume} target="_blank" rel="noreferrer">
              <FileText size={19} />
              View Resume
            </a>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-semibold text-[#52645f] sm:flex sm:flex-wrap sm:gap-x-6">
            <span className="inline-flex min-w-0 items-center gap-2">
              <MapPin size={16} /> {profile.location}
            </span>
            <span className="inline-flex min-w-0 items-center gap-2 break-all">
              <Mail size={16} className="shrink-0" /> {profile.email}
            </span>
            <span className="inline-flex min-w-0 items-center gap-2">
              <BriefcaseBusiness size={16} /> Open to Data/AI internships
            </span>
          </div>
        </div>

        <div className="profile-panel hero-profile-panel">
          <div className="flex items-start gap-5">
            <img src={profile.avatar} alt="Durga Prasad GitHub avatar" className="h-24 w-24 rounded-lg object-cover ring-4 ring-white" />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f756c]">Profile Snapshot</p>
              <h2 className="mt-2 text-2xl font-black text-[#17221f]">CSE + Data Science</h2>
              <p className="mt-2 text-sm leading-6 text-[#52645f]">Building project evidence across ML, analytics dashboards, SQL, and AI-powered full-stack apps.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-tile">
                <p className="text-3xl font-black text-[#17221f]">{metric.value}</p>
                <p className="mt-1 text-sm font-bold text-[#2f4d48]">{metric.label}</p>
                <p className="mt-1 text-xs leading-5 text-[#64736f]">{metric.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-[#17221f]/10 bg-white/70 p-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f756c]">Current Focus</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Python with AI", "SQL", "Data Science", "Power BI", "MERN Frontend"].map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="A practical data profile with full-stack range">
      <div className="flex flex-col gap-8">
        {/* Profile Card */}
        <div className="content-panel p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] items-start">
            <div>
              <h3 className="text-2xl font-black text-[#17221f]">Durga Prasad</h3>
              <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[#4f756c]">
                CSE & Data Science Student
              </p>
              <p className="mt-4 text-[#52645f] leading-relaxed text-sm">
                Passionate about building data-driven products, machine learning pipelines, and responsive web applications.
              </p>
            </div>
            <div className="border-t border-[#17221f]/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="text-lg leading-8 text-[#465752]">
                Computer Science and Data Science Engineering student with a strong foundation in Python, SQL, machine learning, and business analytics. His work combines end-to-end ML pipelines, dashboard storytelling, and deployed AI/MERN applications.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["ML Pipelines", "EDA, preprocessing, feature engineering, model evaluation"],
                  ["Dashboards", "Power BI, Tableau, Excel, KPI analysis"],
                  ["AI Apps", "React, Node.js, MongoDB, Hugging Face, JWT"]
                ].map(([title, text]) => (
                  <div key={title} className="mini-card flex flex-col justify-between h-full">
                    <div>
                      <CheckCircle2 size={19} className="text-[#2f7d68]" />
                      <h3 className="mt-2.5 font-black text-[#17221f] text-sm">{title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-[#52645f]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education Timeline Row */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="section-kicker">
              <GraduationCap size={18} />
              Educational Background
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.education.slice().reverse().map((item) => (
              <div key={item.school} className="timeline-card flex flex-col justify-between p-6 h-full">
                <div>
                  <span className="inline-flex rounded-full bg-[#dcefe4] px-2.5 py-0.5 text-xs font-black text-[#245246] uppercase tracking-wider">
                    {item.period}
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#17221f] leading-snug">{item.school}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#52645f]">{item.program}</p>
                </div>
                <div className="mt-5 border-t border-[#17221f]/5 pt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4f756c] uppercase">Result</span>
                  <span className="text-sm font-black text-[#245246]">{item.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Internships() {
  return (
    <Section id="internships" eyebrow="Internships" title="Current flexible internships and learning tracks">
      <div className="grid gap-5 lg:grid-cols-2">
        {internships.map((internship) => (
          <article key={internship.company} className="content-panel p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f756c]">{internship.timeline}</p>
                <h3 className="mt-2 text-2xl font-black text-[#17221f]">{internship.company}</h3>
                <p className="mt-1 font-bold text-[#31544f]">{internship.role}</p>
              </div>
              <span className="id-pill">
                ID: {internship.internId}
              </span>
            </div>
            <p className="mt-5 leading-7 text-[#52645f]">{internship.description}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#4f756c]">Learnings</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {internship.learnings.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#4f756c]">Tools / Stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {internship.tools.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tooling across analytics, machine learning, and AI web apps">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="content-panel p-6">
            <div className="flex items-center gap-3">
              <span className="icon-box">
                <group.icon size={21} />
              </span>
              <h3 className="text-xl font-black text-[#17221f]">{group.title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured evidence from GitHub">
      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} featured />
        ))}
      </div>
      <div className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">
              <Github size={18} />
              More GitHub Work
            </p>
            <h3 className="mt-2 text-2xl font-black text-[#17221f]">Additional public repositories</h3>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-link">
            View profile <ExternalLink size={15} />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {moreProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card ${featured ? "p-6 sm:p-7" : "p-5"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {featured && <span className="project-label">{project.highlight}</span>}
          {!featured && <span className="text-xs font-black uppercase tracking-[0.14em] text-[#6b7c77]">{project.language}</span>}
          <h3 className="mt-3 text-xl font-black text-[#17221f]">{project.name}</h3>
          <p className="mt-1 text-sm font-bold text-[#31544f]">{project.type}</p>
        </div>
        <Github size={22} className="shrink-0 text-[#4f756c]" />
      </div>
      <p className="mt-4 leading-7 text-[#52645f]">{project.description}</p>
      {featured && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="skill-chip">
              {item}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={project.repo} target="_blank" rel="noreferrer" className="text-link">
          Repository <ExternalLink size={15} />
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="text-link">
            Live <ExternalLink size={15} />
          </a>
        )}
      </div>
    </article>
  );
}

function Experience() {
  return (
    <Section id="certificates" eyebrow="Certificates" title="Certifications, simulations, and skills gained">
      {/* Industry Job Simulations */}
      <div className="mb-12">
        <div className="mb-6">
          <div className="section-kicker">
            <BriefcaseBusiness size={18} />
            Industry Job Simulations
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {experiences.map((item) => (
            <article key={item.title} className="content-panel p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f756c]">{item.period}</p>
                    <h3 className="mt-2 text-xl font-black text-[#17221f]">{item.title}</h3>
                    <p className="mt-1 text-sm font-bold text-[#31544f]">{item.organization}</p>
                  </div>
                  <Award className="text-[#c68f31] shrink-0" size={24} />
                </div>
                <ul className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#52645f]">
                      <ChevronRight size={17} className="mt-1 shrink-0 text-[#2f7d68]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Verified Certifications */}
      <div>
        <div className="mb-6">
          <div className="section-kicker">
            <BookOpenCheck size={18} />
            Verified Certifications
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="cert-row flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <CheckCircle2 size={18} className="shrink-0 text-[#2f7d68]" />
                  <ExternalLink size={16} className="cert-link-icon shrink-0 text-[#4f756c] opacity-60 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-3">
                  <strong className="text-[#17221f] font-black text-base leading-snug">{item.name}</strong>
                  <small className="mt-1.5 block text-xs font-bold text-[#4f756c] uppercase tracking-wider">
                    {item.issuer} • {item.period}
                  </small>
                </div>
              </div>
              <div className="mt-4 border-t border-[#17221f]/5 pt-3">
                <div className="flex flex-wrap gap-1">
                  {item.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center rounded-md bg-[#dcefe4]/50 px-2 py-0.5 text-[10px] font-bold text-[#245246]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-[#17221f]/10 bg-[#17221f] text-white">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-kicker text-[#a9d8c4]">
              <TrendingUp size={18} />
              Available for Opportunities
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Let’s talk about data, AI, analytics, or internship roles.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-white/72">
              Best fit: Data Science Intern, Data Analyst Intern, Python/AI Intern, or MERN frontend roles where analytics and product thinking meet.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a className="contact-button" href={`mailto:${profile.email}`}>
              <Mail size={19} />
              Email
            </a>
            <a className="contact-button" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={19} />
              GitHub
            </a>
            <a className="contact-button" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={19} />
              LinkedIn
            </a>
            <a className="contact-button" href={profile.resume} target="_blank" rel="noreferrer">
              <FileText size={19} />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-3xl">
          <p className="section-kicker">
            <CalendarDays size={18} />
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#17221f] sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default App;
