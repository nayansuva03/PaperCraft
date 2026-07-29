function Loading() {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col items-center justify-center gap-8 border border-slate-100 min-h-[400px]">
      <div className="relative flex justify-center items-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
        <div className="absolute text-3xl animate-pulse">⚙️</div>
      </div>
      
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Analyzing PDF</h2>
        <p className="text-slate-500 text-sm animate-pulse">Please wait this can take some time.</p>
        
        
      </div>
    </div>
  );
}

export default Loading;