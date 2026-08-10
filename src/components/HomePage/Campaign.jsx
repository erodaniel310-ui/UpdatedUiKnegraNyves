import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import campaign2 from "../../images/sideImage.jpg";
import campaign from "../../images/sideImagefour.jpg";

export default function Campaign() {
  return (
    <section className="bg-[#f6f2ea] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <span className="uppercase tracking-[.3em] text-[11px] text-[#a8793f]">
              Autumn / Winter 2026
            </span>

            <h2 className="font-['Bodoni_Moda'] italic font-normal text-5xl lg:text-6xl leading-[1.15] mt-8 text-[#1c1712]">
              Crafted
              <br />
              For The
              <br />
              Modern
              <br />
              Lifestyle.
            </h2>

            <p className="mt-8 text-[#7a7062] leading-8 max-w-lg text-[15px]">
              Discover timeless silhouettes,
              premium fabrics and effortless
              luxury designed for every season.

              Every piece is made to elevate
              your everyday wardrobe.
            </p>

            <div className="flex gap-5 mt-12">

              <Link
                to="/shop"
                className="bg-[#1c1712] text-[#ede7db] px-8 py-4 flex items-center gap-3 border border-[#1c1712] hover:bg-transparent hover:text-[#1c1712] transition text-[12px] tracking-[0.1em]"
              >
                SHOP COLLECTION

                <ArrowRight size={16} />
              </Link>

              <Link
                to="/about"
                className="border border-[#1c1712] px-8 py-4 hover:bg-[#1c1712] hover:text-[#ede7db] transition text-[12px] tracking-[0.1em] text-[#1c1712]"
              >
                OUR STORY
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
              className="absolute right-0 top-0 w-[75%] h-[600px] object-cover border border-[#a8793f]"
            />

            {/* Floating Image */}

            <motion.img
              whileHover={{
                scale: 1.05,
                rotate: -3,
              }}
              src={campaign2}
              alt=""
              className="absolute bottom-0 left-0 w-[45%] h-[320px] object-cover border-[10px] border-[#f6f2ea] outline outline-1 outline-[#a8793f]"
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
              className="absolute top-10 left-10 bg-[#1c1712] border border-[#a8793f] p-7"
            >

              <h3 className="font-['Bodoni_Moda'] italic text-[#ede7db] text-4xl font-normal">
                30%
              </h3>

              <p className="text-[#c9a876] text-[10px] tracking-[0.15em] mt-1">
                OFF NEW COLLECTION
              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}