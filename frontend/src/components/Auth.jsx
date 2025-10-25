import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const url = isLogin
        ? "http://localhost:5001/api/auth/login"
        : "http://localhost:5001/api/auth/signup";
      const payload = isLogin
        ? { email, password }
        : {
            name,
            phone,
            email,
            password,
            age: Number(age),
            weight: Number(weight),
            height: Number(height),
          };

      const response = await axios.post(url, payload, { timeout: 10000 });

      // Save token and userId to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      // Log response for debugging
      console.log("Auth Response:", response.data);

      if (isLogin) {
        // Redirect to /home after login
        navigate("/home");
      } else {
        // After signup, switch to login form
        setIsLogin(true);
      }

      // Reset form fields
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setAge("");
      setWeight("");
      setHeight("");
      setError("");
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage || "Network error: Unable to connect.");
      console.error("Auth Error:", errorMessage);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-gray-900 to-black">
      <div className="relative p-[2px] rounded-2xl w-96 overflow-hidden">
        <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,#ff00ff,#00ffff,#ff00ff)]"></div>
        <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-8 z-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wider">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            {!isLogin && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Full Name"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Phone Number"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Weight (kg)"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Height (cm)"
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Email"
                autoComplete="new-email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
                placeholder="Password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white p-3 rounded-lg font-bold hover:scale-105 transform transition-all duration-300 shadow-lg"
            >
              {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-300">
            {isLogin ? "Need an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-400 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Auth;