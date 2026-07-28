import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(
        form.email,
        form.password,
        form.name
      );

      toast.success(
        "Account created! Please check your email and verify your account before logging in."
      );

      navigate("/login");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md space-y-5"
      >

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border p-4 rounded-xl"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded-xl disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#D4AF37]"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}