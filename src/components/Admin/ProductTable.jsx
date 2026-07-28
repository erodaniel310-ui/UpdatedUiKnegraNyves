import { Pencil, Trash2, Star, PackageX } from "lucide-react";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StockBadge({ stock }) {
  const state =
    stock > 10
      ? { dot: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-200", bg: "bg-emerald-50" }
      : stock > 0
      ? { dot: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-200", bg: "bg-amber-50" }
      : { dot: "bg-rose-500", text: "text-rose-700", ring: "ring-rose-200", bg: "bg-rose-50" };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ${state.bg} ${state.text} ${state.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${state.dot}`} />
      {stock} in stock
    </span>
  );
}

function FeaturedBadge({ featured }) {
  if (featured) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#9C7C1E] ring-1 ring-[#D4AF37]/30">
        <Star size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
        Featured
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-400 ring-1 ring-gray-200">
      Standard
    </span>
  );
}

export default function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl mt-5 border border-gray-100 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
    >
      {/* Gold hairline accent */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#D4AF37] via-[#EAD98F] to-[#D4AF37]" />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          {/* Table Header */}
          <thead className="bg-black">
            <tr>
              <th className="p-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Image
              </th>
              <th className="p-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Product
              </th>
              <th className="p-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Category
              </th>
              <th className="p-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Price
              </th>
              <th className="p-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Stock
              </th>
              <th className="p-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Featured
              </th>
              <th className="p-5 text-right text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-24 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <PackageX size={28} strokeWidth={1.5} />
                    <p className="text-sm tracking-wide">No products found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product, i) => (
                <motion.tr
                  key={product.id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="show"
                  className="group border-t border-gray-100 transition-colors duration-200 hover:bg-[#FAF8F2]"
                >
                  {/* Image */}
                  <td className="p-5">
                    <div className="overflow-hidden rounded-xl ring-1 ring-gray-100">
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        src={
                          product.images?.[0] ||
                          "https://placehold.co/100x100?text=No+Image"
                        }
                        alt={product.name}
                        className="h-16 w-16 object-cover"
                      />
                    </div>
                  </td>

                  {/* Product */}
                  <td className="p-5">
                    <div>
                      <h3 className="font-serif text-[15px] font-semibold tracking-wide text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-xs uppercase tracking-wide text-gray-400">
                        {product.badge || "No Badge"}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-5">
                    <span className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-5">
                    <span className="font-serif text-[15px] font-semibold text-gray-900">
                      ₦{Number(product.price).toLocaleString()}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="p-5">
                    <StockBadge stock={product.stock} />
                  </td>

                  {/* Featured */}
                  <td className="p-5">
                    <FeaturedBadge featured={product.featured} />
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex justify-end gap-2.5 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                      <motion.button
                        whileHover={{ scale: 1.08, y: -1 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37] text-[#B8952E] transition-colors duration-200 hover:bg-[#D4AF37] hover:text-white"
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08, y: -1 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => onDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-gray-500 transition-colors duration-200 hover:border-rose-600 hover:bg-rose-600 hover:text-white"
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}