function About() {
  const frontendTech = ["React", "Vite", "JavaScript", "pdfjs-dist", "jsPDF", "Vercel"];
  const backendTech = ["Node.js", "Express.js", "REST API", "Render"];
  const packages = ["express", "cors", "dotenv", "@google/generative-ai", "pdfjs-dist", "jspdf"];
  const workflowSteps = [
    "Upload a source PDF document",
    "Extract textual content directly in-browser",
    "Securely dispatch content parsing requests to the backend",
    "Backend handles architectural prompts via Gemini AI engine",
    "Gemini models formulate contextually distinct MCQs",
    "Frontend aggregates response arrays onto interactive UI state",
    "Package compiled question sheets seamlessly into download format"
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-4xl p-6 sm:p-10 my-6 transition-colors duration-300 animate-in fade-in duration-300">

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-100/50 dark:border-indigo-800/50">
          <span>🚀</span> Full-Stack AI Application
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">About PDF to MCQ Generator</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base max-w-2xl leading-relaxed">
          This intelligent utility processes document layouts into multi-tier multiple-choice structures utilizing real-time computational pipeline passes through Google's Gemini AI.
        </p>
      </div>

      {/* Tech Stack Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">💻 Frontend Infrastructure</h3>
          <div className="flex flex-wrap gap-2">
            {frontendTech.map((tech) => (
              <span key={tech} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm">{tech}</span>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">⚙️ Backend Layer</h3>
          <div className="flex flex-wrap gap-2">
            {backendTech.map((tech) => (
              <span key={tech} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="p-4 border border-slate-100 dark:border-slate-800 bg-indigo-50/40 dark:bg-indigo-950/30 rounded-xl">
          <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">AI core Framework</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Google Gemini 2.5 Flash</span>
        </div>
        <div className="p-4 border border-slate-100 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/30 rounded-xl">
          <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Frontend Hosting</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Vercel Network Layer</span>
        </div>
        <div className="p-4 border border-slate-100 dark:border-slate-800 bg-amber-50/40 dark:bg-amber-950/30 rounded-xl">
          <span className="block text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">Backend Deployment</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Render Environment</span>
        </div>
      </div>

      {/* Node Packages Component Section */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Modular Node Packages</h3>
        <div className="flex flex-wrap gap-2">
          {packages.map((pkg) => (
            <code key={pkg} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono border border-slate-200/60 dark:border-slate-700">
              {pkg}
            </code>
          ))}
        </div>
      </div>

      {/* Clean Workflow Pipeline */}
      <div className="mb-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Application Architectural Pipeline</h3>
        <ol className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-4">
          {workflowSteps.map((step, index) => (
            <li key={index} className="mb-4 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full -left-3 ring-8 ring-white dark:ring-slate-900">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Developer Profile card */}
      <div className="bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-800/40 p-6 rounded-2xl border border-slate-100/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Project Author Profile</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Designed as a comprehensive full-stack learning implementation exploration.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-bold text-slate-800 dark:text-slate-200">
          🧑‍💻 Developed by Nayan Suva
        </div>
      </div>

    </div>
  );
}

export default About;