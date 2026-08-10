import { Link } from "react-router-dom";
import {
  LogOut,
  User,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { logout } from "../services/authService";
import toast from "react-hot-toast";

export default function ProfileDropdown({
  user,
  close,
  mobile = false,
}) {
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      close();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div
      className={`${
        mobile
          ? "w-full mt-3 rounded-xl border bg-gray-50"
          : "absolute right-0 top-12 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
      }`}
    >
      {user ? (
        <>
          <div className="p-5 border-b">
            <p className="font-semibold break-all">
              {user.email}
            </p>
          </div>

    <Link
  to="/account"
  onClick={close}
  className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100 transition"
>
  <User size={18} />
  My Profile
</Link>

          <Link
            to="/orders"
            onClick={close}
            className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100 transition"
          >
            <ShoppingBag size={18} />
            My Orders
          </Link>

          <Link
            to="/wishlist"
            onClick={close}
            className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100 transition"
          >
            <Heart size={18} />
            Wishlist
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-4 text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={close}
            className="block px-5 py-4 hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={close}
            className="block px-5 py-4 hover:bg-gray-100 transition"
          >
            Create Account
          </Link>
        </>
      )}
    </div>
  );
}