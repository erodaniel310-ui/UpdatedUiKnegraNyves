import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Landmark,
  Zap,
  Check,
  ShieldCheck,
  Lock,
  BadgeCheck,
} from "lucide-react";

// ------------------------------------------------------------------
// NOTE ON FUNCTIONALITY:
// Your original component had a single hardcoded, always-checked,
// read-only "Cash on Delivery" radio — there was no selection logic
// and no props coming in or state going out. To fulfil the "premium
// selectable card" requirement without inventing new checkout
// behavior, `selectedMethod` below is local, UI-only state, defaulted
// to "cod" (matching your original default). Card Payment and
// Paystack are visually disabled ("Coming Soon") and cannot be
// selected, exactly like they don't exist as options today. If you
// later want the chosen method to reach your order logic, this state
// can be lifted up via a prop (e.g. onSelectMethod) — nothing here
// currently changes what gets submitted.
// ------------------------------------------------------------------

const methods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives.",
    icon: Banknote,
    available: true,
  },
  {
    id: "card",
    label: "Card Payment",
    description: "Pay securely with debit or credit card.",
    icon: CreditCard,
    available: false,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    description: "Transfer directly from your bank account.",
    icon: Landmark,
    available: true,
  },
  {
    id: "paystack",
    label: "Paystack",
    description: "Fast, secure payments via Paystack.",
    icon: Zap,
    available: true,
  },
];

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
    >
      <h2 className="font-serif text-2xl font-semibold tracking-wide text-black md:text-3xl">
        Payment Method
      </h2>
      <p className="mt-1.5 text-sm text-gray-500">
        Choose how you'd like to pay for your order.
      </p>

      <div className="mt-7 space-y-3.5">

        {methods.map((method) => {
       const isSelected = paymentMethod === method.id;
          const Icon = method.icon;

          return (
            <label
              key={method.id}
              className={`relative flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                !method.available
                  ? "cursor-not-allowed border-gray-100 bg-gray-50/60 opacity-60"
                  : isSelected
                  ? "cursor-pointer border-[#D4AF37] bg-[#D4AF37]/[0.06] shadow-[0_0_0_4px_rgba(212,175,55,0.1)]"
                  : "cursor-pointer border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={isSelected}
                disabled={!method.available}
                readOnly
               onClick={() => method.available && setPaymentMethod(method.id)}
                className="sr-only"
              />

              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                  isSelected && method.available
                    ? "bg-[#D4AF37] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon size={19} strokeWidth={1.75} />
              </span>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-semibold text-gray-900">
                    {method.label}
                  </p>
                  {!method.available && (
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {method.description}
                </p>
              </div>

              <AnimatePresence>
                {isSelected && method.available && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-white"
                  >
                    <Check size={13} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </label>
          );
        })}

      </div>

      {/* Trust / security footer */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-gray-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2.5">
          <ShieldCheck size={17} strokeWidth={1.75} className="text-[#B8952E]" />
          <span className="text-sm font-medium text-gray-700">Secure Payment</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Lock size={16} strokeWidth={1.75} className="text-[#B8952E]" />
          <span className="text-sm text-gray-500">256-bit SSL Encryption</span>
        </div>

        <div className="flex items-center gap-2.5">
          <BadgeCheck size={17} strokeWidth={1.75} className="text-[#B8952E]" />
          <span className="text-sm text-gray-500">100% Safe Checkout</span>
        </div>

      </div>

    </motion.div>
  );
}