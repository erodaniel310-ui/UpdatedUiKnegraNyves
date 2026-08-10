import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-32 bg-[#1c1712] overflow-hidden relative">

      {/* Corner Frame */}

      <div className="absolute top-6 left-6 w-9 h-9 border-t border-l border-[#a8793f]"></div>
      <div className="absolute bottom-6 right-6 w-9 h-9 border-b border-r border-[#a8793f]"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[.3em] text-[#a8793f] text-[11px]">
            Stay Connected
          </p>

          <h2 className="font-['Bodoni_Moda'] italic font-normal text-[#ede7db] text-5xl md:text-6xl mt-6">
            Join Our Fashion Community
          </h2>

          <p className="text-[#a39a8c] mt-8 text-[15px] leading-8 max-w-2xl mx-auto">
            Be the first to discover new arrivals, exclusive collections,
            seasonal promotions and members-only offers delivered directly
            to your inbox.
          </p>
        </motion.div>

        {/* Form */}

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .2, duration: .7 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="flex flex-col md:flex-row gap-6 max-w-lg mx-auto items-end">

            <div className="relative flex-1 w-full">

              <Mail
                className="absolute left-1 top-1/2 -translate-y-1/2 text-[#8a7f72]"
                size={18}
              />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent text-[#ede7db] border-0 border-b border-[#5c5346] focus:border-[#a8793f] py-3.5 pl-8 pr-2 outline-none text-[15px] transition-colors placeholder:text-[#8a7f72]"
              />

            </div>

            <button
              className="bg-transparent border-b border-[#ede7db] text-[#ede7db] text-[12px] tracking-[0.15em] pb-3.5 whitespace-nowrap hover:border-[#a8793f] hover:text-[#a8793f] transition"
            >
              SUBSCRIBE →
            </button>

          </div>
        </motion.form>

        {/* Benefits */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-4 mt-14 text-[#8a7f72] text-[11px] tracking-[0.1em]"
        >

          <span>EXCLUSIVE OFFERS</span>
          <span className="text-[#a8793f]">·</span>
          <span>EARLY ACCESS</span>
          <span className="text-[#a8793f]">·</span>
          <span>STYLE INSPIRATION</span>
          <span className="text-[#a8793f]">·</span>
          <span>NO SPAM</span>

        </motion.div>

      </div>

    </section>
  );
}