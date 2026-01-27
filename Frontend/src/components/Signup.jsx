import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Signup = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      await Axios.post("/api/signup", userInfo);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-white">
          Chat App
        </h1>
        <p className="text-sm text-gray-400 mt-1 text-center">
          Create a new account
        </p>

        <div className="mt-8 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              {...register("username", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              type="text"
              className="mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 
              text-white placeholder-gray-500 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
              type="email"
              className="mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 
              text-white placeholder-gray-500 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              type={showPassword ? "text" : "password"}
              className="mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 
              text-white placeholder-gray-500 p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              className="mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 
              text-white placeholder-gray-500 p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-9 text-sm text-blue-400 hover:text-blue-300 cursor-pointer" 
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 cursor-pointer rounded-xl font-semibold
            hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Signup
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 font-semibold ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
