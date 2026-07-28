import { auth } from "../firebase/firebase";
import { logout } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Mail,
  ShoppingBag,
  Heart,
  LogOut,
  ArrowLeft,
  ShoppingCart,
  BadgeCheck,
} from "lucide-react";

export default function Account() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Customer";

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">

      <section className="max-w-5xl mx-auto px-6 py-12">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-5xl font-black mb-10">
          My Account
        </h1>

        <div className="bg-white rounded-3xl shadow-sm p-10">

          {/* Profile */}

          <div className="flex items-center gap-6">

            {/* Avatar */}

            <div className="w-20 h-20 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-3xl font-bold">

              {initials}

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {displayName}
              </h2>

              <p className="flex items-center gap-2 text-gray-500 mt-2">

                <Mail size={16} />

                {user?.email}

              </p>

              <p className="text-gray-500 mt-3">
                Welcome back,{" "}
                <span className="font-semibold">
                  {displayName}
                </span>
                👋
              </p>

              {user?.emailVerified ? (
                <div className="flex items-center gap-2 mt-3 text-green-600">

                  <BadgeCheck size={18} />

                  <span className="text-sm font-medium">
                    Verified Account
                  </span>

                </div>
              ) : (
                <p className="mt-3 text-red-500 text-sm">
                  Email not verified
                </p>
              )}

            </div>

          </div>

          {/* Cards */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            {/* Orders */}

            <Link
              to="/orders"
              className="border rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-md transition"
            >

              <ShoppingBag
                className="mb-4 text-[#D4AF37]"
                size={28}
              />

              <h3 className="font-bold text-lg">
                My Orders
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                View all your orders
              </p>

            </Link>

            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="border rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-md transition"
            >

              <Heart
                className="mb-4 text-[#D4AF37]"
                size={28}
              />

              <h3 className="font-bold text-lg">
                Wishlist
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Saved favourite products
              </p>

            </Link>

            {/* Continue Shopping */}

            <Link
              to="/shop"
              className="border rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-md transition"
            >

              <ShoppingCart
                className="mb-4 text-[#D4AF37]"
                size={28}
              />

              <h3 className="font-bold text-lg">
                Continue Shopping
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Browse our latest collection
              </p>

            </Link>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="border rounded-2xl p-6 text-left hover:border-red-500 hover:shadow-md transition"
            >

              <LogOut
                className="mb-4 text-red-500"
                size={28}
              />

              <h3 className="font-bold text-lg">
                Logout
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Sign out of your account
              </p>

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}