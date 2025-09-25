import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import Todo from "../assets/logo.png";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";
import "../main.css";


const SignUp = () => {
  const navigate = useNavigate();

  // Controlled inputs using useState
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.info("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.info("Passwords do not match!");
      return;
    }

    try {
      const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
        firstName,
        lastName,
        email,
        password,
          role, 
      });
      console.log('response.data---', response);
      toast.success("Account Created Successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
      <div className="flex items-center justify-center h-screen" >
      <div className="w-full max-w-md">
        <div className="w-[350px] md:w-[480px]  flex flex-col gap-3 rounded-[24px]" style={{ boxShadow: "0 0 20px 0 rgba(55, 55, 55, 0.3)" }}>
       
          {/* Form */}
          <div className="">
            <h3 className="px-8 pt-6 text-2xl ">Create an Account!</h3>
            
            <form className="px-8 pt-6 pb-6">

              <div className="mb-4 md:flex gap-4">
                <div className=" w-full ">
                  <label htmlFor="firstName" className="block mb-2 text-sm font-bold text-gray-700">
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="lastName" className="block mb-2 text-sm font-bold text-gray-700">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="mb-4 md:flex gap-4">
                <div className="w-full">
                  <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="c_password" className="block mb-2 text-sm font-bold text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div>
              <div className="">
                <label className="block  text-sm font-bold text-gray-700">
                  Select Role
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="role"
                      value="User"
                      checked={role === "User"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2">User</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="role"
                      value="ADMIN"
                      checked={role === "ADMIN"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                </div>
              </div>

              <div className="mb-6 text-center">
                <button
                  onClick={register}
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Register Account
                </button>
              </div>

              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="cursor-pointer inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
