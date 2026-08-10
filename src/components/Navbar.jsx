import { useState } from "react";
import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import Logo from "../images/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SearchOverlay from "./SearchOverlay";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import ProfileDropdown from "./ProfileDropdown";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Accessories", path: "/accessories" },
  { name: "Sale", path: "/sale" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 z-50 w-full bg-[#f6f2ea] border-b border-[#d8cfba]"
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}

          <NavLink
            to="/"
            className="text-2xl font-black tracking-[6px]"
          >
            <img src={Logo} alt="Logo" className="h-10" />
          </NavLink>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
              >
                {({ isActive }) => {

                  const active =
                    isActive ||

                    // Keep Shop active on product pages
                    (link.path === "/shop" &&
                      (location.pathname.startsWith("/shop") ||
                        location.pathname.startsWith("/product"))) ||

                    // Category pages
                    (link.path === "/men" &&
                      location.pathname.startsWith("/men")) ||

                    (link.path === "/women" &&
                      location.pathname.startsWith("/women")) ||

                    (link.path === "/accessories" &&
                      location.pathname.startsWith("/accessories")) ||

                    (link.path === "/sale" &&
                      location.pathname.startsWith("/sale"));

                  return (
                    <span
                      className={`relative text-[12px] tracking-[0.12em] uppercase transition-colors ${
                        active
                          ? "text-[#a8793f]"
                          : "text-[#1c1712] hover:text-[#a8793f]"
                      }`}
                    >
                      {link.name}

                      <motion.span
                        initial={{ width: 0 }}
                        animate={{
                          width: active ? "100%" : 0,
                        }}
                        whileHover={{ width: "100%" }}
                        className="absolute left-0 -bottom-2 h-px bg-[#a8793f]"
                      />
                    </span>
                  );
                }}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}

          <div className="hidden lg:flex items-center gap-5 text-[#1c1712]">
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-[#a8793f] transition"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>

            <Link
              to="/wishlist"
              className="relative cursor-pointer"
            >
              <Heart size={20} strokeWidth={1.75} className="hover:text-[#a8793f] transition" />

              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#a8793f] text-[#ede7db] text-[10px] flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative cursor-pointer"
            >
              <ShoppingBag size={20} strokeWidth={1.75} className="hover:text-[#a8793f] transition" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#a8793f] text-[#ede7db] text-[10px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative">

              {user ? (
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 rounded-full bg-[#a8793f] text-[#ede7db] text-sm font-medium flex items-center justify-center hover:scale-105 transition"
                  >
                    {user?.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user?.email?.charAt(0).toUpperCase()}
                  </button>

                  {profileOpen && (
                    <ProfileDropdown
                      user={user}
                      close={() => setProfileOpen(false)}
                    />
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-[#a8793f] transition"
                >
                  <User size={20} strokeWidth={1.75} />
                </Link>
              )}

            </div>
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-[#1c1712]"
          >
            {mobileMenu ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileMenu && (
          <>
            {/* Backdrop overlay — same click-to-close behavior as before */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 z-[99] bg-[#1c1712]/55 backdrop-blur-[2px]"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-[100] flex h-screen w-full max-w-sm flex-col bg-[#f6f2ea] border-l border-[#a8793f]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-[#d8cfba] px-6 py-6">
                <span className="font-['Bodoni_Moda'] italic text-lg text-[#1c1712]">
                  Menu
                </span>

                <button
                  onClick={() => setMobileMenu(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center border border-[#1c1712] text-[#1c1712] transition-colors duration-200 hover:border-[#a8793f] hover:text-[#a8793f] active:scale-95"
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-8 py-8">

                {/* Staggered nav links */}
                <nav className="flex flex-col gap-1">
                  {links.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setMobileMenu(false)}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 px-1 py-3.5 text-[13px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                            isActive ? "text-[#a8793f]" : "text-[#1c1712] hover:text-[#a8793f]"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                                isActive ? "bg-[#a8793f] scale-100" : "scale-0 bg-transparent"
                              }`}
                            />
                            {item.name}
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-8 h-px w-full bg-[#d8cfba]" />

                <div className="flex flex-col gap-1">

                  {/* Search */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSearchOpen(true);
                      setMobileMenu(false);
                    }}
                    aria-label="Open search"
                    className="flex items-center gap-4 border border-[#1c1712] px-4 py-4 text-[12px] uppercase tracking-[0.1em] text-[#1c1712] transition-colors duration-200 hover:border-[#a8793f] hover:text-[#a8793f] mb-3"
                  >
                    <Search size={18} strokeWidth={1.75} />
                    Search
                  </motion.button>

                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenu(false)}
                    className="group flex items-center justify-between px-1 py-4 text-[13px] tracking-wide text-[#1c1712] transition-colors duration-200 hover:text-[#a8793f]"
                  >
                    <div className="flex items-center gap-4">
                      <Heart size={18} strokeWidth={1.75} className="transition-colors duration-200 group-hover:text-[#a8793f]" />
                      Wishlist
                    </div>

                    <AnimatePresence>
                      {wishlistItems.length > 0 && (
                        <motion.span
                          key="wishlist-badge"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a8793f] px-1.5 text-[10px] font-medium text-[#ede7db]"
                        >
                          {wishlistItems.length}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenu(false)}
                    className="group flex items-center justify-between px-1 py-4 text-[13px] tracking-wide text-[#1c1712] transition-colors duration-200 hover:text-[#a8793f]"
                  >
                    <div className="flex items-center gap-4">
                      <ShoppingBag size={18} strokeWidth={1.75} className="transition-colors duration-200 group-hover:text-[#a8793f]" />
                      Cart
                    </div>

                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.span
                          key="cart-badge"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a8793f] px-1.5 text-[10px] font-medium text-[#ede7db]"
                        >
                          {totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Account */}
                  {user ? (
                    <>
                      <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-expanded={profileOpen}
                        aria-controls="mobile-account-panel"
                        className="group flex items-center justify-between px-1 py-4 text-[13px] tracking-wide text-[#1c1712] transition-colors duration-200 hover:text-[#a8793f]"
                      >
                        <div className="flex items-center gap-4">
                          <User
                            size={18}
                            strokeWidth={1.75}
                            className="transition-colors duration-200 group-hover:text-[#a8793f]"
                          />
                          My Account
                        </div>

                        <motion.span
                          animate={{ rotate: profileOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {profileOpen && (
                          <motion.div
                            id="mobile-account-panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-2"
                          >
                            <ProfileDropdown
                              mobile
                              user={user}
                              close={() => {
                                setProfileOpen(false);
                                setMobileMenu(false);
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-4 px-1 py-4 text-[13px] tracking-wide text-[#1c1712] hover:text-[#a8793f]"
                    >
                      <User size={18} strokeWidth={1.75} />
                      Login
                    </Link>
                  )}

                </div>
              </div>

              {/* Brand signature at the base of the drawer */}
              <div className="border-t border-[#d8cfba] px-8 py-6 text-center">
                <img src={Logo} alt="Knegra Nyves Logo" className="h-7 mx-auto" />
              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}