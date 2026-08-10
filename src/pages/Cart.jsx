import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import EmptyCart from "../components/Cart/EmptyCart";

export default function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="mt-20 bg-[#f6f2ea] min-h-screen">

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center gap-4 mb-4">

          <div className="w-10 h-10 border border-[#1c1712] flex items-center justify-center">
            <ShoppingBag size={18} strokeWidth={1.75} />
          </div>

          <h1 className="font-['Bodoni_Moda'] italic font-normal text-4xl text-[#1c1712]">
            Shopping Cart
          </h1>

        </div>

        <Link
          to="/shop"
          className="inline-block mt-6 mb-10 text-[11px] tracking-[0.15em] text-[#7a7062] hover:text-[#a8793f] transition"
        >
          ← CONTINUE SHOPPING
        </Link>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12">

          <div className="space-y-6">

            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
              />
            ))}

          </div>

          <CartSummary />

        </div>

      </section>

    </main>
  );
}