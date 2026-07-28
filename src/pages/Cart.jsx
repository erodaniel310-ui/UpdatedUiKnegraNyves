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
    <main className="mt-20 bg-[#fafafa] min-h-screen">

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center gap-3 mb-10">

          <ShoppingBag />

          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

        </div>

        <Link
          to="/shop"
          className="inline-block mb-10 text-gray-600 hover:text-black"
        >
          ← Continue Shopping
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