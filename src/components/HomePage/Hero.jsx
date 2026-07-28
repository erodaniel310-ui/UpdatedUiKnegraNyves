import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../images/homeimage.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 h-full">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Fashion Model"
          className="h-full w-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white font-black leading-none text-5xl md:text-7xl xl:text-8xl"
          >
            WEAR
            <br />
            CONFIDENCE
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-200 text-lg md:text-xl mt-8 leading-8 max-w-xl"
          >
            Discover premium fashion crafted for every occasion. Elevate your
            wardrobe with timeless pieces that combine luxury, comfort, and
            modern elegance.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-5 mt-10"
          >
            <Link
              to="/shop"
              className="group bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-3 hover:bg-yellow-400 transition-all duration-300"
            >
              Shop Collection

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </Link>

            <Link
              to="/new-arrivals"
              className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}