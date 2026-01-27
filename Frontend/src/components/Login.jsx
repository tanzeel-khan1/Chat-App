import { useForm } from "react-hook-form";
import Axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    Axios.post("/api/login", userInfo)
      .then((response) => {
        toast.success("Login successful!");
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-white">
          Chat-App
        </h1>
        <p className="text-sm text-gray-400 mt-1 text-center">
          Login to your account
        </p>

        <div className="mt-8 space-y-5">
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
                  message: "Enter a valid email",
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
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters required",
                },
              })}
              type="password"
              className="mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 
              text-white placeholder-gray-500 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white p-3 rounded-xl font-semibold
            hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="text-blue-500 font-semibold  ml-1"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
