import { useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  // Check if this product is already in wishlist
  const isWishlisted = isInWishlist(product.id);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedColor,
      selectedSize
    );

    setQuantity(1);
  };

  // Wishlist
  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div>
      {/* Category */}
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
        {product.category}
      </p>

      {/* Name */}
      <h1 className="mt-2 text-4xl font-bold">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex text-yellow-500">
          <Star
            fill="currentColor"
            size={18}
          />
        </div>

        <span className="text-gray-600">
          {product.rating} Rating
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-center gap-4">
        <span className="text-3xl font-bold">
          ₦{product.price.toLocaleString()}
        </span>

        {product.oldPrice && (
          <span className="text-xl text-gray-400 line-through">
            ₦{product.oldPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-8 leading-8 text-gray-600">
        {product.description}
      </p>

      {/* Colors */}
      {product.colors?.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 font-semibold">
            Color
          </h3>

          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-5 py-2 transition ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-semibold">
            Size
          </h3>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-12 w-12 rounded-lg border transition ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-10">
        <h3 className="mb-4 font-semibold">
          Quantity
        </h3>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border">
          <button
            onClick={decrease}
            className="p-4 transition hover:bg-gray-100"
          >
            <Minus size={18} />
          </button>

          <span className="px-8 font-semibold">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="p-4 transition hover:bg-gray-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4">

        {/* Add To Cart */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-black py-4 text-white transition hover:bg-[#D4AF37]"
        >
          <ShoppingBag size={20} />

          Add to Cart
        </motion.button>

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`flex w-16 items-center justify-center rounded-xl border transition ${
            isWishlisted
              ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
              : "border-gray-300 text-black hover:bg-gray-100"
          }`}
        >
          <Heart
            size={22}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </motion.button>

      </div>
    </div>
  );
}