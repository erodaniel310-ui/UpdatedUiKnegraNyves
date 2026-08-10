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
            Why Shop With Us
          </p>

          <h2 className="font-['Bodoni_Moda'] italic font-normal text-5xl mt-4 text-[#1c1712]">
            Luxury Shopping Experience
          </h2>

          <p className="text-[#7a7062] mt-6 max-w-2xl mx-auto leading-8 text-[15px]">
            From carefully selected products to fast delivery and reliable
            customer support, every part of your shopping experience is
            designed with quality in mind.
          </p>
        </motion.div>

        {/* Index */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4">

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
                  y: -6,
                }}
                className={`group px-8 ${
                  index !== 0 ? "border-l border-[#d8cfba]" : ""
                }`}
              >
                <span className="font-['Bodoni_Moda'] italic text-[12px] text-[#a8793f]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="w-11 h-11 border border-[#1c1712] flex items-center justify-center my-5 group-hover:border-[#a8793f] group-hover:text-[#a8793f] transition">
                  <Icon size={20} />
                </div>

                <h3 className="text-[17px] font-medium text-[#1c1712]">
                  {feature.title}
                </h3>

                <p className="text-[#7a7062] leading-7 mt-2.5 text-[13px]">
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