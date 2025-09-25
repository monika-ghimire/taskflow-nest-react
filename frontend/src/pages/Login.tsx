import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import Logo from "../assets/logo.png";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";
import "../main.css";

const Login = () => {
  const navigate = useNavigate();

  // Controlled input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginApp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.info("Please fill in all fields");
      return;
    }

    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));

      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.warn(error.response.data.message || "Unauthorized");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen" >
      <div className="w-full max-w-md">
     

        <div className="w-[350px] md:w-[480px] py-[48px] px-[35px] md:p-[48px] flex flex-col gap-3 rounded-[24px]" style={{ boxShadow: "0 0 20px 0 rgba(55, 55, 55, 0.3)" }}>
            <span className="font-semibold text-xl text-black flex justify-center items-center gap-2">
            <img src={Logo} className="h-12 w-14" alt="Logo" /> Todo App
          </span>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full p-4  "
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="  w-full p-4  mb-3 "
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          <div className="flex flex-col gap-4 items-center justify-between">
            <button
              onClick={loginApp}
              className="login-btn shodoweffiect flex gap-3 items-center w-full justify-center transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
              type="button"
            >
              Login
            </button>
            <a
              onClick={() => navigate("/signUp")}
              className="cursor-pointer inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
            >
              Sign Up
            </a>
        <p className="text-center text-gray-500 text-xs ">©2025 todo. All rights reserved.</p>

            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
