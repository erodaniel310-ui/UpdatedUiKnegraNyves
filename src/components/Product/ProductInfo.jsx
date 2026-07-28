import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
const { addToCart } = useCart();

  const increase = () => setQuantity((prev) => prev + 1);

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

  // Reset quantity after adding
  setQuantity(1);

  // Later we'll show a toast notification here.
};

  return (
    <div>
      {/* Category */}
      <p className="text-sm uppercase tracking-widest text-gray-500">
        {product.category}
      </p>

      {/* Name */}
      <h1 className="text-4xl font-bold mt-2">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex text-yellow-500">
          <Star fill="currentColor" size={18} />
        </div>

        <span className="text-gray-600">
          {product.rating} Rating
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4 mt-6">
        <span className="text-3xl font-bold">
          ₦{product.price.toLocaleString()}
        </span>

        <span className="text-xl text-gray-400 line-through">
          ₦{product.oldPrice.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="mt-8 text-gray-600 leading-8">
        {product.description}
      </p>

      {/* Colors */}
      <div className="mt-10">
        <h3 className="font-semibold mb-4">
          Color
        </h3>

        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-5 py-2 rounded-full border transition ${
                selectedColor === color
                  ? "bg-black text-white border-black"
                  : "border-gray-300"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-8">
        <h3 className="font-semibold mb-4">
          Size
        </h3>

        <div className="flex gap-3 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-lg border transition ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-10">
        <h3 className="font-semibold mb-4">
          Quantity
        </h3>

        <div className="flex items-center w-fit border rounded-xl overflow-hidden">
          <button
            onClick={decrease}
            className="p-4 hover:bg-gray-100"
          >
            <Minus size={18} />
          </button>

          <span className="px-8 font-semibold">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="p-4 hover:bg-gray-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
       <motion.button
  whileTap={{ scale: 0.97 }}
  onClick={handleAddToCart}
  className="flex-1 bg-black text-white rounded-xl py-4 flex justify-center items-center gap-3 hover:bg-[#D4AF37] transition"
>
  <ShoppingBag size={20} />
  Add to Cart
</motion.button>

        <button className="w-16 rounded-xl border flex justify-center items-center hover:bg-gray-100">
          <Heart />
        </button>
      </div>
    </div>
  );
}