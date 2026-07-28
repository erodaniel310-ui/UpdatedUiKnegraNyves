import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-32 bg-black overflow-hidden relative">

      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl -top-40 -left-32"></div>

      <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[8px] text-yellow-500 text-sm">
            Stay Connected
          </p>

          <h2 className="text-white text-5xl md:text-6xl font-black mt-6">
            Join Our Fashion Community
          </h2>

          <p className="text-gray-400 mt-8 text-lg leading-8 max-w-2xl mx-auto">
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
          <div className="flex flex-col md:flex-row gap-5 max-w-3xl mx-auto">

            <div className="relative flex-1">

              <Mail
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"
                size={22}
              />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white text-black rounded-full py-5 pl-16 pr-6 outline-none text-lg"
              />

            </div>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 transition px-10 py-5 rounded-full font-bold text-black"
            >
              Subscribe
            </button>

          </div>
        </motion.form>

        {/* Benefits */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-10 mt-14 text-gray-400"
        >

          <span>✓ Exclusive Offers</span>

          <span>✓ Early Access</span>

          <span>✓ Style Inspiration</span>

          <span>✓ No Spam</span>

        </motion.div>

      </div>

    </section>
  );
}