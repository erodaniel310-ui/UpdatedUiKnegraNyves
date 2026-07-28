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
  className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm"
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

     <div className="hidden lg:flex items-center gap-8">
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
            className={`relative font-medium transition-colors ${
              active
                ? "text-[#D4AF37]"
                : "text-black hover:text-[#D4AF37]"
            }`}
          >
            {link.name}

            <motion.span
              initial={{ width: 0 }}
              animate={{
                width: active ? "100%" : 0,
              }}
              whileHover={{ width: "100%" }}
              className="absolute left-0 -bottom-2 h-[2px] bg-[#D4AF37]"
            />
          </span>
        );
      }}
    </NavLink>
  ))}
</div>

          {/* Right Icons */}

       <div className="hidden lg:flex items-center gap-5 text-black">
       <button
  onClick={() => setSearchOpen(true)}
  className="hover:text-[#D4AF37] transition"
>
  <Search />
</button>

           <Link
  to="/wishlist"
  className="relative cursor-pointer"
>
  <Heart className="hover:text-[#D4AF37] transition" />

  {wishlistItems.length > 0 && (
    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D4AF37] text-white text-xs flex items-center justify-center">
      {wishlistItems.length}
    </span>
  )}
</Link>

           <Link
  to="/cart"
  className="relative cursor-pointer"
>
  <ShoppingBag className="hover:text-yellow-500 transition" />

  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
      {totalItems}
    </span>
  )}
</Link>

      <div className="relative">

  {user ? (
    <>
 <button
  onClick={() => setProfileOpen(!profileOpen)}
  className="w-10 h-10 rounded-full bg-[#D4AF37] text-white font-bold flex items-center justify-center hover:scale-105 transition"
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
      className="hover:text-[#D4AF37] transition"
    >
      <User />
    </Link>
  )}

</div>
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
         className="lg:hidden text-black"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}

  {/*
  ============================================================
  MOBILE MENU — LUXURY REDESIGN
  ------------------------------------------------------------
  Drop this in place of your existing <AnimatePresence>...</AnimatePresence>
  mobile menu block. All existing state (mobileMenu, setMobileMenu,
  profileOpen, setProfileOpen, searchOpen, setSearchOpen, wishlistItems,
  totalItems, user, links) and the ProfileDropdown component are reused
  exactly as-is — no new state, no new APIs, no routing changes.
  ============================================================
*/}

<AnimatePresence>

  {mobileMenu && (
    <>
      {/* ------------------------------------------------------------
        NEW: Backdrop overlay
        Adds depth and focus — tapping outside the drawer closes it,
        same as tapping the X. Purely additive UX, no logic removed.
      ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setMobileMenu(false)}
        className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        // NEW: full-bleed on mobile, capped width from sm up so it still
        // reads as a refined drawer rather than a full page on larger phones
        className="fixed top-0 right-0 z-[100] flex h-screen w-full max-w-sm flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* ------------------------------------------------------------
          NEW: Drawer header
          Gives the panel a clear top anchor with a brand mark and a
          larger, better-targeted close button (44px touch target).
        ------------------------------------------------------------ */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
          <span className="font-serif text-lg font-semibold tracking-wide text-black">
            Menu
          </span>

          <button
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors duration-200 hover:bg-gray-100 active:scale-95"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        {/* Scrollable body so tall menus never get clipped on small screens */}
        <div className="flex-1 overflow-y-auto px-8 py-8">

          {/* ------------------------------------------------------------
            NEW: Staggered nav links
            Each link fades/slides in slightly after the previous one for
            a more considered, editorial feel. Active state now uses a
            small gold dot instead of color alone, so it reads clearly
            even for colorblind users (accessibility improvement).
          ------------------------------------------------------------ */}
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
                    `group flex items-center gap-3 rounded-xl px-3 py-3.5 text-lg font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? "text-[#B8952E]" : "text-black hover:text-[#B8952E]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator dot */}
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                          isActive ? "bg-[#D4AF37] scale-100" : "scale-0 bg-transparent"
                        }`}
                      />
                      {item.name}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* ------------------------------------------------------------
            NEW: Elegant divider with breathing room instead of a bare <hr>
          ------------------------------------------------------------ */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="flex flex-col gap-2">

            {/* ------------------------------------------------------------
              Search — now styled as the primary action with a filled
              gold-tinted pill, since search is a top-intent action on
              luxury retail sites (Zara/Nike pattern).
            ------------------------------------------------------------ */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSearchOpen(true);
                setMobileMenu(false);
              }}
              aria-label="Open search"
              className="flex items-center gap-4 rounded-xl bg-[#D4AF37]/10 px-4 py-4 text-base font-semibold text-black transition-colors duration-200 hover:bg-[#D4AF37]/15"
            >
              <Search size={20} strokeWidth={2} className="text-[#B8952E]" />
              Search
            </motion.button>

            {/* ------------------------------------------------------------
              Wishlist — icon in a soft rounded tile, animated count badge
              that scales/pops in with AnimatePresence rather than just
              appearing.
            ------------------------------------------------------------ */}
            <Link
              to="/wishlist"
              onClick={() => setMobileMenu(false)}
              className="group flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-black transition-colors duration-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <Heart size={20} strokeWidth={1.75} className="transition-colors duration-200 group-hover:text-[#B8952E]" />
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
                    className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D4AF37] px-1.5 text-xs font-semibold text-white"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* ------------------------------------------------------------
              Cart — same treatment as Wishlist for visual consistency.
            ------------------------------------------------------------ */}
            <Link
              to="/cart"
              onClick={() => setMobileMenu(false)}
              className="group flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-black transition-colors duration-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <ShoppingBag size={20} strokeWidth={1.75} className="transition-colors duration-200 group-hover:text-[#B8952E]" />
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
                    className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D4AF37] px-1.5 text-xs font-semibold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* ------------------------------------------------------------
              Account — same profileOpen/setProfileOpen state and the same
              <ProfileDropdown mobile /> component you already had (which
              already handles the logged-in vs logged-out states: Login/
              Register vs Profile/Orders/Wishlist/Logout). The only change
              is *how* it appears: instead of popping in abruptly it now
              expands/collapses inline with an animated height, and the
              chevron rotates to show state — no floating desktop-style
              dropdown, no new logic invented.
            ------------------------------------------------------------ */}
       {user ? (
  <>
    <button
      onClick={() => setProfileOpen(!profileOpen)}
      aria-expanded={profileOpen}
      aria-controls="mobile-account-panel"
      className="group flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-black transition-colors duration-200 hover:bg-gray-50"
    >
      <div className="flex items-center gap-4">
        <User
          size={20}
          strokeWidth={1.75}
          className="transition-colors duration-200 group-hover:text-[#B8952E]"
        />
        My Account
      </div>

      <motion.span
        animate={{ rotate: profileOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <ChevronDown size={18} />
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
    className="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium text-black hover:bg-gray-50"
  >
    <User size={20} />
    Login
  </Link>
)}

          </div>
        </div>

        {/* ------------------------------------------------------------
          NEW: Quiet brand signature at the base of the drawer — a small
          luxury-retail touch (Zara/Dior mobile menus often anchor the
          panel with a wordmark or tagline).
        ------------------------------------------------------------ */}
        <div className="border-t border-gray-100 px-8 py-6 text-center">
      <img src={Logo} className="h-8 mx-auto" />
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