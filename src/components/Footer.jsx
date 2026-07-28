import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <footer className="bg-[#111111] text-gray-300 relative overflow-hidden">

      <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Newsletter */}

        <div className="bg-[#1a1a1a] rounded-3xl p-10 mb-20 text-center">

          <h2 className="text-4xl font-bold text-white">
            Join Our Newsletter
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Be the first to receive exclusive offers, new arrivals and fashion updates.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="md:w-[400px] h-14 rounded-full px-6 bg-white text-black outline-none"
            />

            <button className="bg-yellow-500 text-black font-semibold px-8 rounded-full hover:bg-yellow-400 transition">
              Subscribe
            </button>

          </div>

        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">

          {/* Brand */}

          <div className="lg:col-span-2">

            <h2 className="text-3xl font-black tracking-[6px] text-white">
              KNEGRA NYVES
            </h2>

            <p className="mt-6 leading-8 text-gray-400 max-w-md">
              Discover timeless fashion designed with elegance,
              confidence and individuality.
              Every collection is created to inspire your everyday lifestyle.
            </p>

            <div className="flex gap-4 mt-8">

              {[
                {
                  icon: Facebook,
                  link: "https://facebook.com",
                },
                {
                  icon: Instagram,
                  link: "https://instagram.com",
                },
                {
                  icon: Twitter,
                  link: "https://twitter.com",
                },
                {
                  icon: Youtube,
                  link: "https://youtube.com",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale:1.1,
                    y:-4,
                  }}
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"
                >
                  <item.icon size={18}/>
                </motion.a>
              ))}

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="text-xl text-white font-semibold mb-6">
              Shop
            </h3>

            <ul className="space-y-4">

              <li><Link to="/women" className="hover:text-yellow-500">Women</Link></li>

              <li><Link to="/men" className="hover:text-yellow-500">Men</Link></li>

              <li><Link to="/accessories" className="hover:text-yellow-500">Accessories</Link></li>

              <li><Link to="/shoes" className="hover:text-yellow-500">Shoes</Link></li>

              <li><Link to="/new-arrivals" className="hover:text-yellow-500">New Arrivals</Link></li>

              <li><Link to="/sale" className="hover:text-yellow-500">Sale</Link></li>

            </ul>

          </div>

          {/* Customer Care */}

          <div>

            <h3 className="text-xl text-white font-semibold mb-6">
              Customer Care
            </h3>

            <ul className="space-y-4">

              <li><Link to="/account" className="hover:text-yellow-500">My Account</Link></li>

              <li><Link to="/orders" className="hover:text-yellow-500">Orders</Link></li>

              <li><Link to="/wishlist" className="hover:text-yellow-500">Wishlist</Link></li>

              <li><Link to="/shipping" className="hover:text-yellow-500">Shipping</Link></li>

              <li><Link to="/returns" className="hover:text-yellow-500">Returns</Link></li>

              <li><Link to="/faq" className="hover:text-yellow-500">FAQs</Link></li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl text-white font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">

                <MapPin className="text-yellow-500 mt-1"/>

                <a
                  href="https://maps.google.com/?q=Victoria+Island+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500"
                >
                  Victoria Island, Lagos, Nigeria
                </a>

              </div>

              <div className="flex gap-4">

                <Phone className="text-yellow-500"/>

                <a
                  href="tel:+2348001234567"
                  className="hover:text-yellow-500"
                >
                  +234 800 123 4567
                </a>

              </div>

              <div className="flex gap-4">

                <Mail className="text-yellow-500"/>

                <a
                  href="mailto:support@knegranyves.com"
                  className="hover:text-yellow-500"
                >
                  support@knegranyves.com
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Trust */}

        <div className="grid md:grid-cols-3 gap-6 mt-20">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-yellow-500"/>

            <div>

              <h4 className="text-white font-semibold">
                Secure Payments
              </h4>

              <p className="text-gray-400 text-sm">
                SSL encrypted checkout
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Truck className="text-yellow-500"/>

            <div>

              <h4 className="text-white font-semibold">
                Free Delivery
              </h4>

              <p className="text-gray-400 text-sm">
                On selected orders
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <RotateCcw className="text-yellow-500"/>

            <div>

              <h4 className="text-white font-semibold">
                Easy Returns
              </h4>

              <p className="text-gray-400 text-sm">
                7-Day return policy
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KNEGRA NYVES. All Rights Reserved.
          </p>

          <div className="flex gap-6 items-center">

            <CreditCard size={18}/>
            <span className="text-sm">Visa</span>
            <span className="text-sm">Mastercard</span>
            <span className="text-sm">Paystack</span>

          </div>

        </div>

      </div>

      <motion.button
        whileHover={{
          scale:1.1,
          y:-4,
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-yellow-500 text-black shadow-2xl flex items-center justify-center"
      >
        <ArrowUp/>
      </motion.button>

    </footer>
  );
}