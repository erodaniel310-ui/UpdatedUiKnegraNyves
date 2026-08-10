import { useState } from "react";
import { login, resetPassword } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function CustomerLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/", { replace: true });
    }catch (error) {
  console.log(error);
  console.log(error.code);
  console.log(error.message);

  switch (error.code) {
    case "auth/invalid-credential":
      toast.error("Incorrect email or password.");
      break;

    case "auth/user-not-found":
      toast.error("No account exists with this email.");
      break;

    case "auth/wrong-password":
      toast.error("Incorrect password.");
      break;

    case "auth/invalid-email":
      toast.error("Invalid email address.");
      break;

    case "auth/too-many-requests":
      toast.error("Too many failed attempts. Try again later.");
      break;

    default:
      toast.error(error.message);
  }
}finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!form.email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(form.email);
      toast.success(
        "Password reset email has been sent. Check your inbox."
      );
    } catch (error) {
      toast.error(
        error.message || "Unable to reset password right now."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">
        Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]"
          value={form.email}
          onChange={handleChange}
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full border p-4 pr-14 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showPassword ? (
              <EyeOff size={22} />
            ) : (
              <Eye size={22} />
            )}
          </button>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading}
            className="text-sm text-[#D4AF37] hover:underline disabled:opacity-60"
          >
            {loading ? "Sending..." : "Forgot Password?"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded-xl hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/account/register"
            className="text-[#D4AF37] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}