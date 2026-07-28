import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  "Description",
  "Additional Information",
  "Reviews",
];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-lg font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="mt-10"
        >
          {activeTab === "Description" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Product Description
              </h3>

              <p className="text-gray-600 leading-8">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "Additional Information" && (
            <div className="space-y-5">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Category</span>
                <span>{product.category}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Available Sizes</span>
                <span>{product.sizes.join(", ")}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Available Colors</span>
                <span>{product.colors.join(", ")}</span>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="text-center py-10">
              <h3 className="text-2xl font-semibold">
                Customer Reviews
              </h3>

              <p className="text-gray-500 mt-4">
                Reviews will be displayed here once customers start purchasing
                and leaving feedback.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}