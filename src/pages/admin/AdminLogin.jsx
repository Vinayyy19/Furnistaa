import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginhere = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const response = await api.post("/admin/login", {
        email,
        password,
      });

      const { token , admin } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", admin.role);

      toast.success("Login successful! Welcome back to Furnista.");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Network error. Please try again."
      );
      setPassword("");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/63/cd/9e/63cd9e3fd6b8fd5c14c82d605a422d35.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-6 sm:p-8">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-bold text-yellow-400 cursor-pointer text-center"
        >
          Furnista
        </h1>

        <p className="text-sm text-gray-300 text-center mt-2">
          Furnista Admin Dashboard
        </p>

        <form className="mt-6 sm:mt-8 space-y-5" onSubmit={loginhere}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="admin@furnista.com"
              className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
