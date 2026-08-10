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
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";
import React from 'react';

export default function Footer() {

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <footer className="bg-[#1c1712] text-[#a39a8c] relative overflow-hidden">

      <div className="h-px bg-gradient-to-r from-transparent via-[#a8793f] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">

          <div className="lg:col-span-2">

            <h2 className="font-['Bodoni_Moda'] italic text-2xl text-[#ede7db] tracking-wide">
              Knegra Nyves
            </h2>

            <p className="mt-6 leading-8 text-[#8a7f72] max-w-md text-[13px]">
              Discover timeless fashion designed with elegance,
              confidence and individuality.
              Every collection is created to inspire your everyday lifestyle.
            </p>

            <div className="flex gap-3 mt-8">

              {[
                { icon: Facebook, link: "https://facebook.com" },
                { icon: Instagram, link: "https://instagram.com" },
                { icon: Twitter, link: "https://twitter.com" },
                { icon: Youtube, link: "https://youtube.com" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="w-9 h-9 border border-[#5c5346] flex items-center justify-center text-[#c9beac] hover:border-[#a8793f] hover:text-[#a8793f] transition"
                >
                  <item.icon size={16}/>
                </motion.a>
              ))}

            </div>

          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] text-[#ede7db] mb-6">SHOP</h3>
            <ul className="space-y-3.5 text-[13px]">
              <li><Link to="/women" className="hover:text-[#a8793f] transition">Women</Link></li>
              <li><Link to="/men" className="hover:text-[#a8793f] transition">Men</Link></li>
              <li><Link to="/accessories" className="hover:text-[#a8793f] transition">Accessories</Link></li>
              <li><Link to="/shoes" className="hover:text-[#a8793f] transition">Shoes</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-[#a8793f] transition">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-[#a8793f] transition">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] text-[#ede7db] mb-6">CUSTOMER CARE</h3>
            <ul className="space-y-3.5 text-[13px]">
              <li><Link to="/account" className="hover:text-[#a8793f] transition">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-[#a8793f] transition">Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#a8793f] transition">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.2em] text-[#ede7db] mb-6">CONTACT</h3>
            <div className="space-y-5 text-[13px]">
              <div className="flex gap-4">
                <MapPin size={17} className="text-[#a8793f] mt-0.5"/>
                <a href="https://maps.google.com/?q=Victoria+Island+Lagos" target="_blank" rel="noopener noreferrer" className="hover:text-[#a8793f] transition">
                  Victoria Island, Lagos, Nigeria
                </a>
              </div>
              <div className="flex gap-4">
                <Phone size={17} className="text-[#a8793f]"/>
                <a href="tel:+2348001234567" className="hover:text-[#a8793f] transition">+234 800 123 4567</a>
              </div>
              <div className="flex gap-4">
                <Mail size={17} className="text-[#a8793f]"/>
                <a href="mailto:support@knegranyves.com" className="hover:text-[#a8793f] transition">support@knegranyves.com</a>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="border-t border-[#3a332a]">
        <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#6b6255] text-[12px]">
            © {new Date().getFullYear()} KNEGRA NYVES. All Rights Reserved.
          </p>
          <div className="flex gap-3 items-center text-[#6b6255]">
            <CreditCard size={16}/>
            <span className="text-[12px] tracking-wide">VISA</span>
            <span className="text-[12px] tracking-wide">MASTERCARD</span>
            <span className="text-[12px] tracking-wide">PAYSTACK</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, y: -3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 border border-[#a8793f] text-[#a8793f] bg-[#1c1712] flex items-center justify-center"
      >
        <ArrowUp size={18}/>
      </motion.button>

    </footer>
  );
}