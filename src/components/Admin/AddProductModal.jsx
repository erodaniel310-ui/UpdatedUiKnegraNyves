import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProductForm from "./ProductForm";

export default function AddProductModal({
  open,
  onClose,
  onSuccess,
  product,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex justify-center items-center p-5"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-8 border-b">
              <h2 className="text-3xl font-bold">
                {product ? "Edit Product" : "Add Product"}
              </h2>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100"
              >
                <X className="mx-auto" />
              </button>
            </div>

            <div className="p-8">
              <ProductForm
                product={product}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}