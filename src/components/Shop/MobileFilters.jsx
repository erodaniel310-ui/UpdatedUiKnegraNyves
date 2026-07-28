import { motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const field = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function FilterSelect({ label, value, onChange, options }) {
  return (
    <motion.div variants={field} className="relative group">
      <label className="pointer-events-none absolute -top-2 left-3 z-10 bg-white px-1.5 text-[10px] font-medium tracking-wide text-gray-400 transition-colors group-focus-within:text-[#B8952E]">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="peer h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/60 px-4 pr-10 text-sm text-gray-700 outline-none transition-all duration-300 ease-out hover:border-gray-300 hover:bg-white focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>

      <motion.span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#D4AF37]"
        initial={false}
      >
        <ChevronDown size={16} strokeWidth={2} />
      </motion.span>

      {/* animated underline accent */}
      <motion.span
        className="pointer-events-none absolute -bottom-[1px] left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8952E] transition-transform duration-300 ease-out peer-focus:scale-x-100"
      />
    </motion.div>
  );
}

export default function MobileFilters({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  sortBy,
  setSortBy,
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="lg:hidden mb-8"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        <div className="mb-5 flex items-center gap-2">
          <motion.span
            initial={{ rotate: -15, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]"
          >
            <SlidersHorizontal size={14} strokeWidth={2.25} />
          </motion.span>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Filter Products
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <FilterSelect
            label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={["All Products", "Men", "Women", "Shoes", "Bags", "Accessories"]}
          />

          <FilterSelect
            label="Price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            options={[
              { value: "all", label: "All Prices" },
              { value: "0-50000", label: "Under ₦50,000" },
              { value: "50000-100000", label: "₦50k - ₦100k" },
              { value: "100000-150000", label: "₦100k - ₦150k" },
              { value: "150000+", label: "Above ₦150k" },
            ]}
          />

          <FilterSelect
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: "featured", label: "Featured" },
              { value: "newest", label: "Newest" },
              { value: "price-low", label: "Price ↑" },
              { value: "price-high", label: "Price ↓" },
              { value: "rating", label: "Highest Rated" },
            ]}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}