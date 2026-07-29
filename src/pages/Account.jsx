import { useState } from "react";
import { auth } from "../firebase/firebase";
import { logout } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  ShoppingBag,
  Heart,
  LogOut,
  ArrowLeft,
  ShoppingCart,
  BadgeCheck,
  Calendar,
  Package,
  Wallet,
  UserCog,
  KeyRound,
  ChevronRight,
  X,
  AlertTriangle,
  
} from "lucide-react";

// ------------------------------------------------------------------
// Animation variants — reused across sections for a consistent,
// Apple-style staggered fade/rise-in feel.
// ------------------------------------------------------------------
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};



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

  // Real Firebase data — creationTime is provided by Firebase Auth's
  // user metadata, so this is genuine, not fabricated.
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    navigate("/");
  };

  // Logout is now a confirmation-gated action. `handleLogout` itself
  // is completely unchanged — only *when* it fires has changed.
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // --------------------------------------------------------------
  // Quick Stats — no order/wishlist-count service exists in this
  // component today, so real numbers aren't fabricated here. These
  // render as "—" until wired to your actual data source (e.g. an
  // orders service or Firestore aggregation query).
  // --------------------------------------------------------------
  const stats = [
    { label: "Orders", value: "—", icon: ShoppingBag },
    { label: "Wishlist", value: "—", icon: Heart },
    { label: "Completed Orders", value: "—", icon: Package },
    { label: "Total Spent", value: "—", icon: Wallet },
  ];

  const quickActions = [
    {
      title: "My Orders",
      subtitle: "View all your orders",
      icon: ShoppingBag,
      to: "/orders",
    },
    {
      title: "Wishlist",
      subtitle: "Saved favourite products",
      icon: Heart,
      to: "/wishlist",
    },
    {
      title: "Continue Shopping",
      subtitle: "Browse our latest collection",
      icon: ShoppingCart,
      to: "/shop",
    },
    {
      title: "Edit Profile",
      subtitle: "Update your personal details",
      icon: UserCog,
      to: "/account/edit",
    },
    {
      title: "Change Password",
      subtitle: "Keep your account secure",
      icon: KeyRound,
      to: "/account/change-password",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa]">

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">

        {/* Back Button — elegant circular icon button */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: -2 }}
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors duration-200 hover:border-[#D4AF37] hover:text-[#B8952E]"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </motion.button>

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl font-semibold tracking-wide text-black sm:text-5xl">
            My Account
          </h1>
          <p className="mt-2 text-[15px] text-gray-500">
            Manage your profile, orders, and preferences.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------
          PROFILE HEADER
        --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10"
        >
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8952E] text-3xl font-bold text-white shadow-lg ring-4 ring-[#D4AF37]/10">
              {initials}
            </div>

            <div className="flex-1">
              <h2 className="font-serif text-2xl font-semibold text-black sm:text-3xl">
                {displayName}
              </h2>

              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500 sm:justify-start">
                <Mail size={15} strokeWidth={1.75} />
                {user?.email}
              </p>

              <p className="mt-3 text-[15px] text-gray-500">
                Welcome back,{" "}
                <span className="font-semibold text-gray-900">{displayName}</span> 👋
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">

                {user?.emailVerified ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <BadgeCheck size={16} strokeWidth={2} />
                    Verified Account
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-500">
                    <AlertTriangle size={15} strokeWidth={2} />
                    Email not verified
                  </span>
                )}

                {memberSince && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <Calendar size={15} strokeWidth={1.75} />
                    Member since {memberSince}
                  </span>
                )}

              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------
          QUICK STATS
        --------------------------------------------------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#B8952E]">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-2xl font-bold text-black">{value}</p>
              <p className="mt-0.5 text-sm text-gray-500">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------------------------------------------------------
          QUICK ACTIONS
        --------------------------------------------------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Quick Actions
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {quickActions.map(({ title, subtitle, icon: Icon, to }) => (
              <motion.div key={title} variants={item} whileHover={{ y: -3 }}>
                <Link
                  to={to}
                  className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-[#D4AF37] hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#B8952E] transition-colors duration-200 group-hover:bg-[#D4AF37] group-hover:text-white">
                      <Icon size={19} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{title}</h4>
                      <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="shrink-0 text-gray-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#B8952E]"
                  />
                </Link>
              </motion.div>
            ))}

            {/* Logout — luxury danger card, opens confirmation modal */}
            <motion.div variants={item} whileHover={{ y: -3 }}>
              <button
                onClick={() => setLogoutConfirmOpen(true)}
                className="group flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:border-rose-400 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-colors duration-200 group-hover:bg-rose-500 group-hover:text-white">
                    <LogOut size={19} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Logout</h4>
                    <p className="mt-0.5 text-sm text-gray-500">Sign out of your account</p>
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-gray-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-rose-400"
                />
              </button>
            </motion.div>

          </div>
        </motion.div>

      </section>

      {/* -------------------------------------------------------------
        LOGOUT CONFIRMATION MODAL
      ------------------------------------------------------------- */}
      <AnimatePresence>
        {logoutConfirmOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLogoutConfirmOpen(false)}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Confirm logout"
              className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl"
            >
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
              >
                <X size={16} />
              </button>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <LogOut size={20} strokeWidth={1.75} />
              </span>

              <h3 className="mt-5 text-xl font-semibold text-black">
                Log out of your account?
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                You'll need to sign in again to view your orders, wishlist, and saved details.
              </p>

              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => setLogoutConfirmOpen(false)}
                  className="h-12 flex-1 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-[#D4AF37] hover:text-[#B8952E]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setLogoutConfirmOpen(false);
                    handleLogout();
                  }}
                  className="h-12 flex-1 rounded-full bg-black text-sm font-semibold text-white transition-colors duration-200 hover:bg-rose-500"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}