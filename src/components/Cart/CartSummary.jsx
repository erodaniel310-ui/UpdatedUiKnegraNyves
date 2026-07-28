import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const { cartTotal } = useCart();

  const shipping = cartTotal >= 100000 ? 0 : 5000;

  const total = cartTotal + shipping;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 sticky top-28 h-fit">

      <h2 className="text-2xl font-bold mb-8">
        Order Summary
      </h2>

      {/* Subtotal */}

      <div className="flex justify-between mb-5">
        <span className="text-gray-500">
          Subtotal
        </span>

        <span className="font-semibold">
          ₦{cartTotal.toLocaleString()}
        </span>
      </div>

      {/* Shipping */}

      <div className="flex justify-between mb-5">
        <span className="text-gray-500">
          Shipping
        </span>

        <span className="font-semibold">
          {shipping === 0
            ? "FREE"
            : `₦${shipping.toLocaleString()}`}
        </span>
      </div>

      {/* Divider */}

      <div className="border-t my-6" />

      {/* Total */}

      <div className="flex justify-between items-center mb-8">

        <span className="text-xl font-bold">
          Total
        </span>

        <span className="text-3xl font-bold">
          ₦{total.toLocaleString()}
        </span>

      </div>

      {/* Coupon */}

      <div className="space-y-3 mb-8">

        <input
          type="text"
          placeholder="Coupon Code"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          className="w-full border border-black rounded-xl py-3 font-semibold hover:bg-black hover:text-white transition"
        >
          Apply Coupon
        </button>

      </div>

      {/* Checkout */}

      <Link
        to="/checkout"
        className="flex justify-center items-center gap-3 w-full bg-black text-white rounded-xl py-4 hover:bg-[#D4AF37] transition"
      >
        Proceed to Checkout

        <ArrowRight size={20} />
      </Link>

      {/* Continue Shopping */}

      <Link
        to="/shop"
        className="block text-center mt-6 text-gray-500 hover:text-black transition"
      >
        Continue Shopping
      </Link>

    </div>
  );
}