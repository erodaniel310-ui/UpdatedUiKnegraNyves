import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { logout } from "../services/authService";
import { getUserOrders } from "../services/orderService";
import { useNavigate, Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
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

// -------------------------------------------------------------
// Animation variants
// -------------------------------------------------------------

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Account() {
  const navigate = useNavigate();

  const { wishlistItems } = useWishlist();

  const user = auth.currentUser;

  const [orders, setOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

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

  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      )
    : null;

  useEffect(() => {
    async function loadOrders() {
      if (!user) {
        setLoadingStats(false);
        return;
      }

      try {
        setLoadingStats(true);

        const customerOrders = await getUserOrders(user.uid);

        setOrders(customerOrders);
      } catch (error) {
        console.error(
          "Failed to load customer orders:",
          error
        );

        toast.error(
          "Unable to load your account statistics."
        );
      } finally {
        setLoadingStats(false);
      }
    }

    loadOrders();
  }, [user]);

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "delivered"
  ).length;

  const totalSpent = orders
    .filter(
      (order) =>
        order.status?.toLowerCase() === "delivered"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

  const formattedTotalSpent =
    `₦${totalSpent.toLocaleString("en-NG")}`;

  const stats = [
    {
      label: "Orders",
      value: loadingStats ? "..." : totalOrders,
      icon: ShoppingBag,
    },
    {
      label: "Wishlist",
      value: wishlistItems.length,
      icon: Heart,
    },
    {
      label: "Completed Orders",
      value: loadingStats ? "..." : completedOrders,
      icon: Package,
    },
    {
      label: "Total Spent",
      value: loadingStats ? "..." : formattedTotalSpent,
      icon: Wallet,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Logout failed.");
    }
  };

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
    <main className="min-h-screen bg-[#f6f2ea]">

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">

        {/* BACK BUTTON */}

        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: -2 }}
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mb-8 flex h-11 w-11 items-center justify-center border border-[#1c1712] bg-transparent text-[#1c1712] transition-colors duration-200 hover:border-[#a8793f] hover:text-[#a8793f]"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </motion.button>

        {/* PAGE HEADING */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-10"
        >
          <h1 className="font-['Bodoni_Moda'] italic font-normal text-4xl text-[#1c1712] sm:text-5xl">
            My Account
          </h1>

          <p className="mt-2 text-[15px] text-[#7a7062]">
            Manage your profile, orders, and preferences.
          </p>
        </motion.div>

        {/* PROFILE HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="border border-[#d8cfba] bg-white p-7 sm:p-10"
        >
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">

            {/* Avatar */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#a8793f] text-3xl font-medium text-[#ede7db]">
              {initials}
            </div>

            <div className="flex-1">

              <h2 className="font-['Bodoni_Moda'] italic font-normal text-2xl text-[#1c1712] sm:text-3xl">
                {displayName}
              </h2>

              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#7a7062] sm:justify-start">
                <Mail size={15} strokeWidth={1.75} />

                {user?.email}
              </p>

              <p className="mt-3 text-[15px] text-[#7a7062]">
                Welcome back,{" "}
                <span className="font-medium text-[#1c1712]">
                  {displayName}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">

                {user?.emailVerified ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] font-medium text-emerald-700">
                    <BadgeCheck size={16} strokeWidth={2} />
                    VERIFIED ACCOUNT
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] font-medium text-[#9c4a3c]">
                    <AlertTriangle size={15} strokeWidth={2} />
                    EMAIL NOT VERIFIED
                  </span>
                )}

                {memberSince && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-[#a39a8c]">
                    <Calendar size={15} strokeWidth={1.75} />
                    MEMBER SINCE {memberSince.toUpperCase()}
                  </span>
                )}

              </div>
            </div>
          </div>
        </motion.div>

        {/* REAL QUICK STATS */}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >

          {stats.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -3 }}
              className="border border-[#d8cfba] bg-white p-5"
            >

              <span className="flex h-9 w-9 items-center justify-center border border-[#a8793f] text-[#a8793f]">
                <Icon size={17} strokeWidth={1.75} />
              </span>

              <p className="mt-4 text-2xl font-semibold text-[#1c1712]">
                {value}
              </p>

              <p className="mt-0.5 text-sm text-[#7a7062]">
                {label}
              </p>

            </motion.div>
          ))}

        </motion.div>

        {/* QUICK ACTIONS */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >

          <h3 className="mb-4 text-[11px] font-medium tracking-[0.2em] text-[#a8793f]">
            QUICK ACTIONS
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {quickActions.map(({ title, subtitle, icon: Icon, to }) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -3 }}
              >

                <Link
                  to={to}
                  className="group flex items-center justify-between border border-[#d8cfba] bg-white p-6 transition-colors duration-200 hover:border-[#a8793f]"
                >

                  <div className="flex items-center gap-4">

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#a8793f] text-[#a8793f] transition-colors duration-200 group-hover:bg-[#a8793f] group-hover:text-[#ede7db]">
                      <Icon size={19} strokeWidth={1.75} />
                    </span>

                    <div>

                      <h4 className="font-medium text-[#1c1712]">
                        {title}
                      </h4>

                      <p className="mt-0.5 text-sm text-[#7a7062]">
                        {subtitle}
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={18}
                    className="shrink-0 text-[#a39a8c] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#a8793f]"
                  />

                </Link>

              </motion.div>
            ))}

            {/* LOGOUT */}

            <motion.div
              variants={item}
              whileHover={{ y: -3 }}
            >

              <button
                onClick={() => setLogoutConfirmOpen(true)}
                className="group flex w-full items-center justify-between border border-[#d8cfba] bg-white p-6 text-left transition-colors duration-200 hover:border-[#9c4a3c]"
              >

                <div className="flex items-center gap-4">

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#9c4a3c] text-[#9c4a3c] transition-colors duration-200 group-hover:bg-[#9c4a3c] group-hover:text-[#ede7db]">
                    <LogOut size={19} strokeWidth={1.75} />
                  </span>

                  <div>

                    <h4 className="font-medium text-[#1c1712]">
                      Logout
                    </h4>

                    <p className="mt-0.5 text-sm text-[#7a7062]">
                      Sign out of your account
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-[#a39a8c] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#9c4a3c]"
                />

              </button>

            </motion.div>

          </div>
        </motion.div>

      </section>

      {/* LOGOUT CONFIRMATION MODAL */}

      <AnimatePresence>

        {logoutConfirmOpen && (
          <>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLogoutConfirmOpen(false)}
              className="fixed inset-0 z-[100] bg-[#1c1712]/55 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Confirm logout"
              className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 border border-[#a8793f] bg-[#f6f2ea] p-7"
            >

              <button
                onClick={() => setLogoutConfirmOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center border border-transparent text-[#a39a8c] transition-colors duration-200 hover:border-[#1c1712] hover:text-[#1c1712]"
              >
                <X size={16} />
              </button>

              <span className="flex h-12 w-12 items-center justify-center border border-[#9c4a3c] text-[#9c4a3c]">
                <LogOut size={20} strokeWidth={1.75} />
              </span>

              <h3 className="mt-5 text-xl font-['Bodoni_Moda'] italic text-[#1c1712]">
                Log out of your account?
              </h3>

              <p className="mt-2 text-sm text-[#7a7062]">
                You'll need to sign in again to view
                your orders, wishlist, and saved
                details.
              </p>

              <div className="mt-7 flex gap-3">

                <button
                  onClick={() => setLogoutConfirmOpen(false)}
                  className="h-12 flex-1 border border-[#1c1712] text-sm font-medium text-[#1c1712] transition-colors duration-200 hover:border-[#a8793f] hover:text-[#a8793f]"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setLogoutConfirmOpen(false);
                    handleLogout();
                  }}
                  className="h-12 flex-1 bg-[#1c1712] text-sm font-medium text-[#ede7db] transition-colors duration-200 hover:bg-[#9c4a3c]"
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