function SavedServices({ isLoggedIn, onLogin }) {

  if (!isLoggedIn) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md border border-slate-100 animate-in fade-in duration-200">
        <span className="text-4xl">🔒</span>
        <h2 className="text-xl font-bold mt-2 text-slate-800">Feature Locked</h2>
        <p className="text-slate-500 text-sm mt-2 mb-4">
          Please <span className="text-red-600">Register</span> to use this feature.
        </p>
        <button
          onClick={onLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
        >
          Sign In Now
        </button>
      </div>
    );
  }
  //-------------------------------------------------------------------------------------------------------------------------------------------------
  // TODO:
  // this section will be used for storing previse pdfs after i connect it to database.
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md border border-slate-100">
      <span className="text-4xl">📚</span>
      <h2 className="text-xl font-bold mt-2 text-slate-800">Previous Archives</h2>
      <p className="text-slate-400 text-sm mt-1">Your saved history items will display here.</p>
    </div>
  );
}


export default SavedServices