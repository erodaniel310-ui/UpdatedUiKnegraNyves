import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "../../context/WishlistContext";


export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();
const liked = isInWishlist(product.id);
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-3xl bg-gray-100">
          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[420px] object-cover transition duration-500 "
          />

          {/* Hover Image */}
          <img
            src={product.images[1] || product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-[420px] object-cover opacity-0 transition duration-500 "
          />

          {/* Badge */}
          <span className="absolute top-5 left-5 bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
            {product.badge}
          </span>
{/* Wishlist */}
<button
  onClick={(e) => {
    e.preventDefault();

    if (liked) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  }}
  className={`absolute top-5 right-5 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition ${
    liked
      ? "bg-[#D4AF37] text-white"
      : "bg-white hover:bg-black hover:text-white"
  }`}
>
  <Heart
    size={18}
    fill={liked ? "currentColor" : "none"}
  />
</button>

          {/* Add to Cart */}
         <button
  onClick={(e) => {
    e.preventDefault();

    addToCart(
      product,
      1,
      product.colors?.[0] || null,
      product.sizes?.[0] || null
    );

    toast.success("Added to cart");
  }}
  className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 transition duration-500 bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#D4AF37]"
>
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-6">
        <div className="flex items-center gap-1 text-yellow-500">
          <Star fill="currentColor" size={16} />
          <span className="text-sm text-gray-600">
            {product.rating}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 text-xl font-semibold hover:text-[#D4AF37] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-bold">
            ₦{product.price.toLocaleString()}
          </span>

          <span className="text-gray-400 line-through">
            ₦{product.oldPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}