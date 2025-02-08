import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navigation() {
  const { userSession, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 border-b-2 border-black fixed top-0 left-0 w-full z-50">
      <Link to="/" className="text-2xl md:text-4xl font-bold text-white">
        YourPosts
      </Link>

      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      <nav
        className={`absolute md:sticky top-16 left-0 w-full md:w-auto bg-blue-700 md:bg-transparent p-4 md:p-0  ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-lg sm:text-2xl">
          {userSession ? (
            <>
              <li className="hover:text-white">
                <Link
                  to={`/user/${userSession.userId}`}
                  onClick={() => setMenuOpen(false)}
                >
                  My Posts
                </Link>
              </li>
              <li className="hover:text-white">
                <Link to="/create" onClick={() => setMenuOpen(false)}>
                  Create
                </Link>
              </li>
              <li className="hover:text-white">
                <button onClick={logout} className="cursor-pointer">
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li className="hover:text-white">
              <Link to="/auth" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
