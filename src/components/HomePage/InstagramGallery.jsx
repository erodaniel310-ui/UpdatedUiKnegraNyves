// in this section connect it to a CMS

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

import insta1 from "../../images/imagesectionthree.jpg"
import insta2 from "../../images/imagesectionthree.jpg"
import insta3 from "../../images/imagesectionthree.jpg"
import insta4 from "../../images/imagesectionthree.jpg"
import insta5 from "../../images/imagesectionthree.jpg"
import insta6 from "../../images/imagesectionthree.jpg"

const images = [
  insta1,
  insta2,
  insta3,
  insta4,
  insta5,
  insta6,
];

export default function InstagramGallery() {
  return (
    <section className="py-28 bg-[#f6f2ea]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[.3em] text-[#a8793f] text-[11px]">
            Follow Our Journey
          </p>

          <h2 className="font-['Bodoni_Moda'] italic font-normal text-2xl mt-4 text-[#1c1712]">
          YourFashionBrand
          </h2>

          <p className="text-[#7a7062] mt-6 max-w-2xl mx-auto leading-8 text-[15px]">
            Get inspired by the latest looks, behind-the-scenes moments,
            and our growing fashion community.
          </p>
        </motion.div>

        {/* Gallery */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">

          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: .9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: .5,
                delay: index * .1,
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden group cursor-pointer"
            >

              <img
                src={image}
                alt={`Instagram ${index + 1}`}
                className="w-full h-[280px] object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-[#1c1712]/0 group-hover:bg-[#1c1712]/55 transition duration-500 flex items-center justify-center">

                <motion.div
                  initial={{ opacity: 0, scale: .5 }}
                  whileHover={{ scale: 1.1 }}
                  className="opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <div className="w-10 h-10 border border-[#ede7db] flex items-center justify-center">
                    <Instagram size={18} className="text-[#ede7db]" />
                  </div>
                </motion.div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Button */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com/knegranyves"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#1c1712] text-[#1c1712] px-9 py-4 text-[12px] tracking-[0.15em] hover:bg-[#1c1712] hover:text-[#ede7db] transition"
          >
            FOLLOW ON INSTAGRAM
          </a>
        </motion.div>

      </div>
    </section>
  );
}