import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <motion.div
        layout
        className="overflow-hidden rounded-3xl bg-gray-100"
      >
        <motion.img
          key={selectedImage}
          src={selectedImage}
          alt={product.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-[650px] object-cover"
        />
      </motion.div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-4">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
              selectedImage === image
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-28 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}