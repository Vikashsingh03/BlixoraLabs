import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);


  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("loginStatusChanged", handleStorageChange);
    return () => {
      window.removeEventListener("loginStatusChanged", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        Blixora Labs
      </Link>

      <div className="hidden sm:flex gap-6 text-base font-medium text-gray-700">
        {!isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/simulations">Simulations</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/simulations">Simulations</Link>
            <Link to="/admin">Admin</Link>
            <button
              onClick={handleLogout}
              className="text-red-600  hover:underline "
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
