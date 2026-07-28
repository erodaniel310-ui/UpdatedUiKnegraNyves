import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center">

        <Heart
          size={70}
          className="text-[#D4AF37]"
        />

        <h2 className="mt-6 text-4xl font-bold">
          Your Wishlist is Empty
        </h2>

        <p className="mt-3 text-gray-500 text-center max-w-md">
          Save your favorite luxury pieces here so you can
          find them anytime.
        </p>

        <Link
          to="/shop"
          className="mt-8 bg-black text-white px-8 py-4 rounded-full hover:bg-[#D4AF37] transition"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">

      <div className="mb-12">

        <h1 className="text-5xl font-bold">
          Wishlist
        </h1>

        <p className="text-gray-500 mt-3">
          {wishlistItems.length} saved item(s)
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {wishlistItems.map((product) => (

          <motion.div
            key={product.id}
            whileHover={{ y: -8 }}
            className="group"
          >

            <div className="relative overflow-hidden rounded-3xl bg-gray-100">

              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-[380px] object-cover"
              />

              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  toast.success("Removed from wishlist");
                }}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <h3 className="mt-5 text-xl font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 font-bold text-lg">
              ₦{Number(product.price).toLocaleString()}
            </p>

            <button
              onClick={() => {
                addToCart(
                  product,
                  1,
                  product.colors?.[0] || null,
                  product.sizes?.[0] || null
                );

                toast.success("Added to cart");
              }}
              className="mt-5 w-full bg-black text-white h-12 rounded-xl flex justify-center items-center gap-2 hover:bg-[#D4AF37] transition"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

          </motion.div>

        ))}

      </div>

    </div>
  );
}