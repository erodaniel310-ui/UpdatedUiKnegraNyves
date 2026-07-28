import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Enjoy free nationwide delivery on orders above ₦100,000.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Your transactions are protected with industry-standard encryption.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Return or exchange eligible items within 30 days of delivery.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our customer care team is always ready to assist you.",
  },
];

export default function WhyChooseUs() {
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
            Why Shop With Us
          </p>

          <h2 className="text-5xl font-black mt-4">
            Luxury Shopping Experience
          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto leading-8">
            From carefully selected products to fast delivery and reliable
            customer support, every part of your shopping experience is
            designed with quality in mind.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .6,
                  delay: index * .15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-gray-200 bg-white p-10 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-600 transition">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}