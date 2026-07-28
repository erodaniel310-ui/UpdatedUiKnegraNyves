import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../Shop/ProductCard";
import { subscribeToProducts } from "../../services/productService";

const filters = [
  "All",
  "New Arrivals",
  "Best Sellers",
  "Sale",
];

export default function FeaturedCollection() {
  const [active, setActive] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
    });

    return unsubscribe;
  }, []);

  if (!products.length) {
    return (
      <section className="py-28">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  const filtered =
    active === "All"
      ? products
      : products.filter((item) => {
          if (active === "New Arrivals") {
            return item.isNew === true;
          }

          if (active === "Best Sellers") {
            return item.bestSeller === true;
          }

          if (active === "Sale") {
            return item.sale === true;
          }

          return true;
        });

  return (
    <section className="py-28 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[8px] text-yellow-600 text-sm">
            Featured Collection
          </p>

          <h2 className="text-5xl font-black mt-5">
            Luxury Meets Everyday Style
          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Discover our handpicked collection of premium clothing,
            footwear and accessories designed for modern living.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mt-14 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`px-6 py-3 rounded-full transition ${
                active === filter
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16"
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}