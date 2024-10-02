import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Social from "../../shared/Social";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ email, password });
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-semibold text-center text-gray-700">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="mt-10">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="label mt-2">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-blue-500"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
        <Social />
      </div>
    </div>
  );
};

export default Login;
