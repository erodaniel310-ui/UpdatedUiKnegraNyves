import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <main className="min-h-screen mt-20 bg-[#fafafa] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-sm p-12 max-w-lg w-full text-center"
      >

        {/* Icon */}

        <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag
            size={40}
            className="text-gray-400"
          />
        </div>

        {/* Heading */}

        <h1 className="text-3xl font-bold mt-8">
          Your Cart is Empty
        </h1>

        {/* Description */}

        <p className="text-gray-500 mt-4 leading-7">
          Looks like you haven't added any products to your shopping cart yet.
          Explore our latest collections and find something you'll love.
        </p>

        {/* Button */}

        <Link
          to="/shop"
          className="inline-flex items-center justify-center mt-10 bg-black text-white px-8 py-4 rounded-xl hover:bg-[#D4AF37] transition"
        >
          Continue Shopping
        </Link>

      </motion.div>
    </main>
  );
}