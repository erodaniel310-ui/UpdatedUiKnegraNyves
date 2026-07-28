import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import campaign2 from "../../images/sideImage.jpg";
import campaign from "../../images/sideImagefour.jpg";

export default function Campaign() {
  return (
    <section className="bg-[#f8f8f8] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <span className="uppercase tracking-[8px] text-sm text-yellow-600">
              Autumn / Winter 2026
            </span>

            <h2 className="text-5xl lg:text-7xl font-black leading-tight mt-8">
              Crafted
              <br />
              For The
              <br />
              Modern
              <br />
              Lifestyle.
            </h2>

            <p className="mt-8 text-gray-600 leading-8 max-w-lg">
              Discover timeless silhouettes,
              premium fabrics and effortless
              luxury designed for every season.

              Every piece is made to elevate
              your everyday wardrobe.
            </p>

            <div className="flex gap-5 mt-12">

              <Link
                to="/shop"
                className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-yellow-600 transition"
              >
                Shop Collection

                <ArrowRight size={18} />
              </Link>

              <Link
                to="/about"
                className="border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition"
              >
                Our Story
              </Link>

            </div>

          </motion.div>

          {/* RIGHT IMAGES */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative h-[700px]"
          >

            {/* Main Image */}

            <motion.img
              whileHover={{ scale: 1.03 }}
              src={campaign}
              alt=""
              className="absolute right-0 top-0 w-[75%] h-[600px] object-cover rounded-3xl shadow-2xl"
            />

            {/* Floating Image */}

            <motion.img
              whileHover={{
                scale: 1.05,
                rotate: -3,
              }}
              src={campaign2}
              alt=""
              className="absolute bottom-0 left-0 w-[45%] h-[320px] object-cover rounded-3xl border-[12px] border-white shadow-xl"
            />

            {/* Floating Card */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute top-10 left-10 bg-white rounded-2xl shadow-xl p-6"
            >

              <h3 className="font-black text-4xl">
                30%
              </h3>

              <p className="text-gray-500">
                OFF NEW COLLECTION
              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}