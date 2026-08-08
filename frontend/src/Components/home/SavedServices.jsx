'use client'

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function SavedServices() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  function onLogin (){
    navigate("/signIn")
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center max-w-md border border-slate-100 dark:border-slate-800 transition-colors duration-300 animate-in fade-in duration-200">
        <span className="text-4xl">🔒</span>
        <h2 className="text-xl font-bold mt-2 text-slate-800 dark:text-slate-100">Feature Locked</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-4">
          Please <span className="text-red-600 dark:text-red-400 font-semibold">Register</span> to use this feature.
        </p>
        <button
          onClick={onLogin}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.99] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
        >
          Sign In Now
        </button>
      </div>
    );
  }
 
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center max-w-md border border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <span className="text-4xl">📚</span>
      <h2 className="text-xl font-bold mt-2 text-slate-800 dark:text-slate-100">Previous Archives</h2>
      <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Your saved history items will display here.</p>
    </div>
  );
}

export default SavedServices;