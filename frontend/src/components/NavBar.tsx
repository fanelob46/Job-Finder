import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../assets/logo.jpg";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if the current route is the profile page
  const isProfilePage = location.pathname === "/profile";

  return (
    <nav className="flex justify-around items-center bg-[#086c9c] text-white py-3 px-6">
      {/* Logo */}
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="h-20" />
      </Link>

      {/* Right Section: Sign In, Sign Up & Hamburger */}
      <div className="flex items-center space-x-4">
        {!isProfilePage && (
          <>
            <Link to={"/login"}>
              <h1 className="uppercase">Sign in</h1>
            </Link>
            <h1>/</h1>
            <Link to={"/SignUp"}>
              <h1 className="uppercase">Sign Up</h1>
            </Link>
          </>
        )}

        {/* Always Visible Hamburger Menu */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl p-2 focus:outline-none"
          >
            <FiMenu />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineUser className="text-lg" />
                <span>My Profile</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
