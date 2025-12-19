import { useForm } from "react-hook-form";
import Axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const { authUser, setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatematachPassword = (value) => {
    return value === watch("password") || "Passwords do not match";
  };
  const onSubmit = async (data) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await Axios.post("/api/signup", userInfo)
      .then((response) => {
        console.log("Signup successful:", response.data);
        if (response.data.success) {
          toast.success("Signup successful! You can now log in.");
        }
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(`Signup failed: ${error.response.data.message}`);
        }
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
        >
          <h1 className="text-3xl font-extrabold text-center text-gray-800">
            Messenger
          </h1>

          <p className="text-sm text-gray-500 mt-1 text-center">
            Create a new account
          </p>

          <div className="mt-8 space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                {...register("username", {
                  required: "name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
                type="text"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 
                focus:ring-blue-200 focus:border-blue-500 p-3"
                placeholder="Enter username"
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 
                focus:ring-blue-200 focus:border-blue-500 p-3"
                placeholder="name@example.com"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                type="password"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 
                focus:ring-blue-200 focus:border-blue-500 p-3"
                placeholder="Enter password"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 
                focus:ring-blue-200 focus:border-blue-500 p-3"
                placeholder="Confirm password"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 
              transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Signup
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?
            <Link to={"/login"} className="text-blue-600 font-semibold cursor-pointer hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
