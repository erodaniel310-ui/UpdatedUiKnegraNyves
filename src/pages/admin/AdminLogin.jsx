import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await login(form.email, form.password);

      toast.success("Welcome back!");

      navigate("/admin");
    } catch (error) {
      console.error(error);

      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex justify-center items-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >

        <h1 className="text-4xl font-bold text-center">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Knegra Nyves Dashboard
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-5 top-5 text-gray-400"
            />

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full h-14 rounded-xl border pl-14 pr-4 outline-none focus:border-[#D4AF37]"
            />

          </div>

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-5 top-5 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full h-14 rounded-xl border pl-14 pr-14 outline-none focus:border-[#D4AF37]"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-5 top-5 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full h-14 rounded-xl bg-black text-white font-semibold hover:bg-[#D4AF37] transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </motion.div>

    </div>
  );
}