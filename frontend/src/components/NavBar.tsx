import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { User } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const user = getLoginInfo();
  const role = user?.role ?? "";

  // Helper function to check if path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div
            onClick={() => navigate("/active")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={Logo} className="h-10 w-12" alt="Logo" />
            <span className="text-gray-800 font-bold text-xl tracking-wide">
              Todo App
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate("/active")}
              className={`text-gray-700 font-medium transition px-3 py-1 rounded ${
                isActive("/active") ? "bg-purple-100 text-purple-600" : "hover:text-purple-600"
              }`}
            >
              Active Todos
            </button>
            <button
              onClick={() => navigate("/completed")}
              className={`text-gray-700 font-medium transition px-3 py-1 rounded ${
                isActive("/completed") ? "bg-purple-100 text-purple-600" : "hover:text-purple-600"
              }`}
            >
              Completed
            </button>
            {role === "ADMIN" && (
              <button
                onClick={() => navigate("/users")}
                className={`text-gray-700 font-medium transition px-3 py-1 rounded ${
                  isActive("/users") ? "bg-purple-100 text-purple-600" : "hover:text-purple-600"
                }`}
              >
                Users
              </button>
            )}
          </div>

          {/* Right Side (User Info + Logout) */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <User size={18} className="text-gray-600" />
                <span className="text-sm text-gray-700 font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
