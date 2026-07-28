import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function OrderSummary({
  subtotal,
  discount,
  total,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  onPlaceOrder,
}) {
  const {
    cartItems,
    cartTotal,
  } = useCart();

  const shipping = 0;


  // ------------------------------------------------------------------
  // UI-ONLY local state for the coupon field below. It does NOT affect
  // cartTotal / total in any way — there is no discount calculation
  // wired up yet, since that logic doesn't exist in the original
  // component. This is purely a ready-made UI slot for whenever a real
  // coupon/discount function is connected.
  // ------------------------------------------------------------------
  const [couponOpen, setCouponOpen] = useState(false);
  if (cartItems.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sticky top-28">

        <div className="flex flex-col items-center py-12 text-center">

          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
            <ShoppingBag
              size={32}
              strokeWidth={1.5}
              className="text-gray-300"
            />
          </span>

          <h2 className="mt-6 font-serif text-2xl font-semibold text-black">
            Your cart is empty
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Looks like you haven't added
            anything yet.
          </p>

          <Link
            to="/shop"
            className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:shadow-lg"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sticky top-28 md:p-8"
    >

      <h2 className="font-serif text-2xl font-semibold tracking-wide text-black md:text-3xl">
        Order Summary
      </h2>
      <p className="mt-1.5 text-sm text-gray-500">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your bag
      </p>

      {/* Product list */}
      <div className="mt-7 space-y-5">

        {cartItems.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
          >

            <div className="relative shrink-0">
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-24 w-24 rounded-2xl object-cover ring-1 ring-gray-100"
              />

              {/* Quantity badge */}
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-xs font-semibold text-white ring-2 ring-white">
                {item.quantity}
              </span>
            </div>

            <div className="flex-1">

              <h3 className="text-[15px] font-semibold text-gray-900">
                {item.name}
              </h3>

              {/* Size & color as chips instead of plain text */}
              {(item.color || item.size) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.color && (
                    <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                      {item.color}
                    </span>
                  )}
                  {item.size && (
                    <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                      Size {item.size}
                    </span>
                  )}
                </div>
              )}

            </div>

            <div className="whitespace-nowrap font-semibold text-gray-900">
              ₦
              {(
                item.price *
                item.quantity
              ).toLocaleString()}
            </div>

          </div>

        ))}

      </div>

      {/* Coupon code — UI scaffold only, no discount logic wired */}
      <div className="mt-7">
        <button
          type="button"
          onClick={() => setCouponOpen(!couponOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-dashed border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:border-[#D4AF37] hover:text-[#B8952E]"
        >
          <span className="flex items-center gap-2">
            <Tag size={15} strokeWidth={1.75} />
            Have a coupon code?
          </span>
          <motion.span animate={{ rotate: couponOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={16} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {couponOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
                />
               <button
  type="button"
  onClick={onApplyCoupon}
  className="rounded-xl bg-black px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#D4AF37]"
>
  Apply
</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Totals */}
      <div className="mt-7 space-y-3.5 border-t border-gray-100 pt-6">

        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <motion.span
            key={cartTotal}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-medium text-gray-900"
          >
          ₦{subtotal.toLocaleString()}
          </motion.span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0
              ? "Free"
              : `₦${shipping.toLocaleString()}`}
          </span>
        </div>
        {discount > 0 && (
  <div className="flex justify-between text-sm text-green-600">
    <span>Discount</span>

    <span className="font-semibold">
      -₦{discount.toLocaleString()}
    </span>
  </div>
)}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span className="font-medium text-gray-400">
            Calculated at checkout
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="text-lg font-semibold text-black">Total</span>
          <motion.span
            key={total}
            initial={{ opacity: 0.4, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-black"
          >
            ₦{total.toLocaleString()}
          </motion.span>
        </div>

      </div>

      {/* Place order — Apple-checkout-style button */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="mt-8 h-14 w-full rounded-full bg-black text-[15px] font-semibold tracking-wide text-white shadow-lg transition-colors duration-300 hover:bg-[#D4AF37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
        onClick={onPlaceOrder}
      >
        Place Order
      </motion.button>

      {/* Trust badges */}
      <div className="mt-7 grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">

        <div className="flex flex-col items-center gap-1.5 text-center">
          <ShieldCheck size={18} strokeWidth={1.75} className="text-[#B8952E]" />
          <span className="text-[11px] font-medium leading-tight text-gray-500">
            Secure Checkout
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <Truck size={18} strokeWidth={1.75} className="text-[#B8952E]" />
          <span className="text-[11px] font-medium leading-tight text-gray-500">
            Free Shipping
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <RotateCcw size={18} strokeWidth={1.75} className="text-[#B8952E]" />
          <span className="text-[11px] font-medium leading-tight text-gray-500">
            Money-Back Guarantee
          </span>
        </div>

      </div>

    </motion.div>
  );
}