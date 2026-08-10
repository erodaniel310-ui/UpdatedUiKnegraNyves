import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import women from "../../images/imagesectionone.jpg"
import men from "../../images/imagesectiontwo.jpg"
import accessories from "../../images/imagesectionthree.jpg"

const categories = [
  {
    title: "Women",
    subtitle: "Elegant. Modern. Timeless.",
    image: women,
    link: "/women",
  },

  {
    title: "Men",
    subtitle: "Designed for confidence.",
    image: men,
    link: "/men",
  },

  {
    title: "Accessories",
    subtitle: "Complete every look.",
    image: accessories,
    link: "/accessories",
  },
];

export default function Categories() {
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
            Shop By Category
          </p>

          <h2 className="font-['Bodoni_Moda'] italic font-normal text-5xl mt-4 text-[#1c1712]">
            Discover Your Style
          </h2>

          <p className="text-[#7a7062] mt-6 max-w-xl mx-auto leading-8 text-[15px]">
            Carefully curated collections designed to bring luxury,
            confidence and effortless style into your everyday wardrobe.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-5">

          {categories.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .2,
                duration: .7,
              }}
              viewport={{ once: true }}
            >
              <Link
                to={item.link}
                className="group block relative overflow-hidden h-[460px]"
              >

                {/* Image */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1712] via-[#1c1712]/20 to-transparent" />

                {/* Look number */}

                <span className="font-['Bodoni_Moda'] italic absolute top-4 left-4 text-xs text-[#ede7db]">
                  {`No. ${String(index + 1).padStart(2, "0")}`}
                </span>

                {/* Content */}

                <div className="absolute bottom-0 left-0 right-0 p-7">

                  <motion.h3
                    whileHover={{ x: 5 }}
                    className="font-['Bodoni_Moda'] italic text-white text-[28px] font-normal"
                  >
                    {item.title}
                  </motion.h3>

                  <p className="text-[#c9beac] mt-1.5 text-xs tracking-wide">
                    {item.subtitle}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-white text-[11px] tracking-[0.15em]">

                    SHOP NOW

                    <ArrowRight
                      className="group-hover:translate-x-2 transition"
                      size={14}
                    />

                  </div>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}