import React from "react";

function About() {
  const frontendTech = [
    "React 19",
    "Vite",
    "Redux Toolkit",
    "React Router",
    "Tailwind CSS",
    "jsPDF",
    "pdfjs-dist",
    "Axios",
    "Lucide React"
  ];

  const backendTech = [
    "Node.js",
    "Express 5",
    "MongoDB & Mongoose",
    "Google Gemini API",
    "JWT (Access/Refresh Tokens)",
    "Cloudinary",
    "Nodemailer / Resend",
    "bcryptjs"
  ];

  const coreFeatures = [
    {
      icon: "📄",
      title: "AI Document Parsing",
      desc: "Upload study materials or PDFs and extract clean textual content for instant generation."
    },
    {
      icon: "🧾",
      title: "Exam Paper Generator",
      desc: "Create and download formatted, high-quality exam paper PDFs in seconds."
    },
    {
      icon: "🧠",
      title: "Online Quiz Mode",
      desc: "Take AI-generated quizzes in-browser with real-time scoring and instant feedback."
    },
    {
      icon: "❓",
      title: "Max Question Bank",
      desc: "Generate downloadable sets focused on high-weightage and max-marks style questions."
    },
    {
      icon: "💾",
      title: "Saved Services",
      desc: "Store generated papers and quizzes in your profile to access or re-download anytime."
    },
    {
      icon: "🔐",
      title: "Secure Auth & OTP",
      desc: "Complete authentication suite with OTP verification, cookie-based JWTs, and password resets."
    }
  ];

  const workflowSteps = [
    "Upload source study material or PDF documents",
    "Extract textual content and pass it through client-side PDF parsers",
    "Dispatch secure prompt payloads to the Express backend engine",
    "Process content via Google Gemini AI (@google/genai) to formulate structured questions",
    "Render interactive quizzes or format printable PDF layouts instantly on the frontend",
    "Save generated papers and quizzes to MongoDB for cloud persistence"
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-4xl p-6 sm:p-10 my-6 transition-colors duration-300 animate-in fade-in duration-300">

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-100/50 dark:border-indigo-800/50">
          <span>📝</span> PaperCraft — Full-Stack MERN AI App
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          About PaperCraft
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base max-w-2xl leading-relaxed">
          PaperCraft turns any PDF or study material into ready-to-use exam papers, interactive online quizzes, or a bank of max-marks-style questions — powered by Google’s Gemini AI.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          ✨ Core Platform Capabilities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-900/50"
            >
              <div className="text-2xl mb-2">{feat.icon}</div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">
                {feat.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            💻 Frontend Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {frontendTech.map((tech) => (
              <span
                key={tech}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            ⚙️ Backend Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {backendTech.map((tech) => (
              <span
                key={tech}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="p-4 border border-slate-100 dark:border-slate-800 bg-indigo-50/40 dark:bg-indigo-950/30 rounded-xl">
          <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            AI Core Engine
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Google Gemini API (@google/genai)
          </span>
        </div>
        <div className="p-4 border border-slate-100 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/30 rounded-xl">
          <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Frontend Hosting
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Vercel Platform
          </span>
        </div>
        <div className="p-4 border border-slate-100 dark:border-slate-800 bg-amber-50/40 dark:bg-amber-950/30 rounded-xl">
          <span className="block text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            Cloud Assets & DB
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            MongoDB Atlas & Cloudinary
          </span>
        </div>
      </div>

      {/* Clean Workflow Pipeline */}
      <div className="mb-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">
          Application Architecture & Workflow
        </h3>
        <ol className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-4">
          {workflowSteps.map((step, index) => (
            <li key={index} className="mb-4 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full -left-3 ring-8 ring-white dark:ring-slate-900">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 pt-0.5">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Developer Profile Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-800/40 p-6 rounded-2xl border border-slate-100/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">
            Project Author
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Designed and engineered as a full-stack MERN & AI integration project.
          </p>
        </div>
        <a
          href="https://github.com/nayansuva03"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"
        >
          <span>🧑‍💻</span> Developed by Nayan Suva (@nayansuva03)
        </a>
      </div>

    </div>
  );
}

export default About;