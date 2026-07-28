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
    <section className="py-28 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[8px] text-yellow-600 text-sm">
            Follow Our Journey
          </p>

          <h2 className="text-5xl font-black mt-4">
            @YourFashionBrand
          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto leading-8">
            Get inspired by the latest looks, behind-the-scenes moments,
            and our growing fashion community.
          </p>
        </motion.div>

        {/* Gallery */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

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
              className="relative overflow-hidden rounded-3xl group cursor-pointer"
            >

              <img
                src={image}
                alt={`Instagram ${index + 1}`}
                className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500 flex items-center justify-center">

                <motion.div
                  initial={{ opacity: 0, scale: .5 }}
                  whileHover={{ scale: 1.1 }}
                  className="opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <Instagram size={28} className="text-black" />
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
            href="#"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition"
          >
            Follow on Instagram
          </a>
        </motion.div>

      </div>
    </section>
  );
}
