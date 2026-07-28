import { CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <main className="mt-20 min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-16">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-10 text-center"
      >

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 180,
          }}
        >
          <CheckCircle
            size={90}
            className="mx-auto text-green-500"
          />
        </motion.div>

        <h1 className="mt-8 text-4xl font-black">
          Thank You!
        </h1>

        <p className="mt-4 text-gray-500 leading-7">
          Your order has been placed successfully.
          Our team will review it and begin processing shortly.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-50 p-6">

          <p className="text-gray-500">
            Order Number
          </p>

          <h2 className="mt-2 text-xl font-bold break-all">
            {id}
          </h2>

          <div className="mt-6 flex justify-between items-center border-t pt-6">

            <span className="font-medium">
              Status
            </span>

            <span className="rounded-full bg-yellow-100 text-yellow-700 px-4 py-2 text-sm font-semibold">
              Pending
            </span>

          </div>

        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">

          <Link
            to="/orders"
            className="rounded-full bg-black text-white py-4 font-semibold hover:bg-[#D4AF37] transition"
          >
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="rounded-full border py-4 font-semibold hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>

        </div>

      </motion.div>

    </main>
  );
}