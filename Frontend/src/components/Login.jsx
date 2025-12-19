import { useForm } from "react-hook-form";
import Axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const { authUser, setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    Axios.post("/api/login", userInfo)
      .then((response) => {
        console.log("Login  successful:", response.data);
        if (response.data) {
          alert("Login! You can now log in.");
        }
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert("Signup failed" + error.response.data.message);
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
            Login to your account
          </p>

          <div className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 p-3"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 characters required",
                  },
                })}
                type="password"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 p-3"
                placeholder="Enter password"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 
              transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account?
            <Link
              to={"/signup"}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              {" "}
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
