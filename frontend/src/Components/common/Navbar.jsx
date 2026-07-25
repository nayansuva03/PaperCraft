import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Navbar({ isLoggedIn, onLogin, onLogout }) {

  // helper function for tailwind css
  const getLinkClass = ({ isActive }) =>
    `font-semibold text-sm px-1 py-2 transition-all border-b-2 ${isActive
      ? "text-indigo-600 border-indigo-600"
      : "text-slate-500 border-transparent hover:text-slate-800"
    }`;

  const username = useSelector((state) => { return state.user.username });


  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="font-extrabold text-slate-800 text-xl tracking-tight">
              Paper<span className="text-indigo-600">Craft📦</span>
            </span>
          </NavLink>


          <div className="flex space-x-8 h-full items-center">
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            <NavLink to="/PreviousPDFs" className={getLinkClass}>Previous PDFs</NavLink>
            <NavLink to="/About" className={getLinkClass}>About</NavLink>
          </div>


          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <button
                onClick={onLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Register
              </button>
            ) : (
              <>
                <h1>
                    <span className="font-extrabold text-xl tracking-tight text-indigo-600">Hi, </span>
                    <span className="font-extrabold text-slate-800 text-xl tracking-tight">{username}</span>
                </h1>
                <button
                  onClick={onLogout}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Log out
                </button>
              </>

            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;