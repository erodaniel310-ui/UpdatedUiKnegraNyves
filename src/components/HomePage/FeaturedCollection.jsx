import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../Shop/ProductCard";
import { subscribeToProducts } from "../../services/productService";

// Suggested pairing: display = "Fraunces" (italic, weight 400-500),
// body/labels = "Inter" or "Neue Haas Grotesk". Load via your font pipeline
// and set as CSS vars --font-display / --font-body, referenced below.

const filters = ["All", "New Arrivals", "Best Sellers", "Sale"];

export default function FeaturedCollection() {
  const [active, setActive] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => setProducts(data));
    return unsubscribe;
  }, []);

  if (!products.length) {
    return (
      <section className="py-32 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#a39a8c] tracking-[0.3em] text-xs uppercase">
            Loading Collection…
          </p>
        </div>
      </section>
    );
  }

  const filtered =
    active === "All"
      ? products
      : products.filter((item) => {
          if (active === "New Arrivals") return item.isNew === true;
          if (active === "Best Sellers") return item.bestSeller === true;
          if (active === "Sale") return item.sale === true;
          return true;
        });

  return (
    <section className="py-32 bg-[#f6f2ea] relative overflow-hidden">
      {/* faint oversized watermark word — quiet texture, not decoration */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 left-1/2 -translate-x-1/2 text-[220px] leading-none font-serif italic text-[#0e0e10]/[0.03] whitespace-nowrap"
      >
        Collection
      </span>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 bg-[#b08d57]" />
            <p className="uppercase tracking-[0.4em] text-[#b08d57] text-[11px] font-medium">
              Featured Collection
            </p>
            <span className="h-px w-10 bg-[#b08d57]" />
          </div>

          <h2 className="font-serif italic text-5xl md:text-6xl text-[#0e0e10] font-normal tracking-tight">
            Luxury, Meets Everyday
          </h2>

          <p className="text-[#8a7f72] mt-6 max-w-xl mx-auto text-[15px] leading-relaxed">
            A handpicked edit of clothing, footwear, and accessories —
            considered pieces for a considered life.
          </p>
        </motion.div>

        {/* Filters — gallery-style tabs with a sliding gold indicator */}
        <div className="flex justify-center gap-10 mt-16 border-b border-[#0e0e10]/10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`relative pb-4 text-[13px] uppercase tracking-[0.15em] transition-colors ${
                active === filter
                  ? "text-[#0e0e10]"
                  : "text-[#a39a8c] hover:text-[#0e0e10]"
              }`}
            >
              {filter}
              {active === filter && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#b08d57]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            layout
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-x-8 gap-y-14 mt-16"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-[#a39a8c] mt-20 text-sm tracking-wide">
            Nothing in this edit yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}