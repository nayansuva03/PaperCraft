import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { useState } from "react";
import { Menu, X } from "lucide-react";


function Navbar() {

  // helper function for tailwind css
  const getLinkClass = ({ isActive }) =>
    `font-semibold text-sm px-1 py-2 transition-all border-b-2 ${isActive
      ? "text-indigo-600 border-indigo-600"
      : "text-slate-500 border-transparent hover:text-slate-800"
    }`;

  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  function handleOnLogin() {
    navigate("/LogIn");
  }
  function handleOnSingin() {
    navigate("/signIn");
  }
  function handleOnLogout() {
    navigate("/");
  }


  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Navbar */}
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <NavLink
            to="/"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span className="font-extrabold text-slate-800 text-xl tracking-tight">
              Paper<span className="text-indigo-600">Craft📦</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 h-full items-center">
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>

            <NavLink to="/SavedServices" className={getLinkClass}>
              Saved Services
            </NavLink>

            <NavLink to="/About" className={getLinkClass}>
              About Us
            </NavLink>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleOnLogin}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Log In
                </button>
                <button
                  onClick={handleOnSingin}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Sign In
                </button>
              </>
              
            ) : (
              <>
                <h1>
                  <span className="font-extrabold text-xl tracking-tight text-indigo-600">
                    Hi,
                  </span>{" "}
                  <span className="font-extrabold text-slate-800 text-xl tracking-tight">
                    {username}
                  </span>
                </h1>

                <button
                    onClick={handleOnLogout}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Log out
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-7 h-7 text-slate-800" />
              ) : (
                <Menu className="w-7 h-7 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col gap-4">

              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={getLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/SavedServices"
                onClick={() => setMenuOpen(false)}
                className={getLinkClass}
              >
                Saved Services
              </NavLink>

              <NavLink
                to="/About"
                onClick={() => setMenuOpen(false)}
                className={getLinkClass}
              >
                About Us
              </NavLink>

              <hr />

              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      handleOnLogin();
                      setMenuOpen(false);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      handleOnSingin();
                      setMenuOpen(false);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold"
                  >
                    Sing In
                  </button>
                </>
                
              ) : (
                <>
                  <div className="font-bold text-slate-800">
                    Hi, <span className="text-indigo-600">{username}</span>
                  </div>

                  <button
                    onClick={() => {
                      handleOnLogout();
                      setMenuOpen(false);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 py-2 rounded-xl font-semibold text-slate-700"
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;