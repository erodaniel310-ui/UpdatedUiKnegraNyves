import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../images/homeimage.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-[#1c1712]">
      <div className="absolute inset-0 h-full">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Fashion Model"
          className="h-full w-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#1c1712]/45"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1712]/80 via-[#1c1712]/30 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-2xl">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-['Bodoni_Moda'] italic font-normal leading-[1.08] text-5xl md:text-7xl xl:text-8xl text-[#ede7db]"
          >
            Wear it with
            <br />
            confidence
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#c9beac] text-lg md:text-xl mt-8 leading-8 max-w-xl"
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
              className="group bg-[#ede7db] text-[#1c1712] px-8 py-4 text-[12px] tracking-[0.1em] font-medium flex items-center gap-3 border border-[#ede7db] hover:bg-transparent hover:text-[#ede7db] transition-all duration-300"
            >
              SHOP COLLECTION
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition"
              />
            </Link>

            <Link
              to="/new-arrivals"
              className="border border-[#a8793f] text-[#ede7db] px-8 py-4 text-[12px] tracking-[0.1em] font-medium hover:bg-[#a8793f]/10 transition-all duration-300"
            >
              NEW ARRIVALS
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}