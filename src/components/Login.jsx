import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">
                Password is required
              </p>
            )}
          </div>

          {/* Alert Message */}
          {message && (
            <p className="mb-3 text-xs italic text-red-500">{message}</p>
          )}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="px-8 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm font-medium">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>

        {/* Google Sign-In */}
        <div className="mt-4">
        <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full gap-1 px-4 py-2 font-bold text-white rounded bg-secondary hover:bg-blue-700 focus:outline-none"
          >
            <FaGoogle className="mr-1" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-xs text-center text-gray-500">
          ©2025 Book Sphere. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
