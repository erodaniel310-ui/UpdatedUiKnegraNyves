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
    <section className="py-28 bg-white">

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
            Shop By Category
          </p>

          <h2 className="text-5xl font-black mt-4">
            Discover Your Style
          </h2>

          <p className="text-gray-500 mt-6 max-w-xl mx-auto leading-8">
            Carefully curated collections designed to bring luxury,
            confidence and effortless style into your everyday wardrobe.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-8">

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
                className="group block relative overflow-hidden rounded-3xl h-[650px]"
              >

                {/* Image */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Content */}

                <div className="absolute bottom-0 left-0 right-0 p-10">

                  <motion.h3
                    whileHover={{ x: 5 }}
                    className="text-white text-4xl font-bold"
                  >
                    {item.title}
                  </motion.h3>

                  <p className="text-gray-300 mt-3">
                    {item.subtitle}
                  </p>

                  <div className="mt-8 flex items-center gap-3 text-white font-semibold">

                    Shop Now

                    <ArrowRight
                      className="group-hover:translate-x-2 transition"
                      size={20}
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