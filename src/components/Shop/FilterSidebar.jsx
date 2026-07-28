import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All Products",
  "Men",
  "Women",
  "Shoes",
  "Bags",
  "Accessories",
];

const sizes = ["XS", "S", "M", "L", "XL"];

const colors = [
  "Black",
  "White",
  "Grey",
  "Brown",
  "Blue",
];
const priceRanges = [
  {
    label: "All Prices",
    value: "all",
  },
  {
    label: "₦0 - ₦50,000",
    value: "0-50000",
  },
  {
    label: "₦50,000 - ₦100,000",
    value: "50000-100000",
  },
  {
    label: "₦100,000 - ₦150,000",
    value: "100000-150000",
  },
  {
    label: "₦150,000+",
    value: "150000+",
  },
];

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}) {
  const [openCategory, setOpenCategory] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [openColor, setOpenColor] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);

  return (
   <aside className="hidden lg:block bg-white rounded-3xl p-6 shadow-sm h-fit sticky top-28">
      <h2 className="text-2xl font-bold mb-8">
        Filters
      </h2>

      {/* Categories */}

      <div className="border-b pb-6">
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="flex justify-between items-center w-full font-semibold"
        >
          Categories

          <ChevronDown
            className={`transition ${
              openCategory ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openCategory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-5"
            >
              <div className="space-y-3">
                {categories.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === item}
                      onChange={() => setSelectedCategory(item)}
                      className="accent-black"
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sizes */}

      <div className="border-b py-6">
        <button
          onClick={() => setOpenSize(!openSize)}
          className="flex justify-between items-center w-full font-semibold"
        >
          Sizes

          <ChevronDown
            className={`transition ${
              openSize ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openSize && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-5"
            >
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="border rounded-lg px-4 py-2 hover:bg-black hover:text-white transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

{/* Price */}

<div className="border-b py-6">

  <button
    onClick={() => setOpenPrice(!openPrice)}
    className="flex justify-between items-center w-full font-semibold"
  >
    Price

    <ChevronDown
      className={`transition ${
        openPrice ? "rotate-180" : ""
      }`}
    />
  </button>

  <AnimatePresence>

    {openPrice && (

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden mt-5"
      >

        <div className="space-y-3">

          {priceRanges.map((price) => (

            <label
              key={price.value}
              className="flex items-center gap-3 cursor-pointer"
            >

              <input
                type="radio"
                name="price"
                checked={selectedPrice === price.value}
                onChange={() => setSelectedPrice(price.value)}
                className="accent-black"
              />

              <span>{price.label}</span>

            </label>

          ))}

        </div>

      </motion.div>

    )}

  </AnimatePresence>

</div>

      {/* Colors */}

      <div className="pt-6">
        <button
          onClick={() => setOpenColor(!openColor)}
          className="flex justify-between items-center w-full font-semibold"
        >
          Colors

          <ChevronDown
            className={`transition ${
              openColor ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {openColor && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-5"
            >
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}