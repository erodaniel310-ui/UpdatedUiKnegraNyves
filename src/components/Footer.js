import React from 'react';
import { 
  
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle 
} from 'lucide-react';
import logo from "../images/logo.png";

function Footer() {
  return (
    <footer className=" text-slate-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
        {/* Brand Section with Newsletter */}
<div className="space-y-6">
  <div className="flex items-center space-x-3">
    <img src={logo} alt="logo" className="h-10 w-auto" />
  </div>

  {/* Newsletter */}
  <div>
    <h3 className="text-sm font-semibold mb-2 text-slate-900">Subscribe to our Newsletter</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // handle form logic here (e.g., call an API or show a toast)
      }}
      className="flex items-center space-x-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        required
        className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
      >
        Subscribe
      </button>
    </form>
  </div>

  {/* Social Icons */}
  <div className="flex space-x-4">
    <a 
      href="#" 
      className="text-slate-900 hover:text-blue-400 transition-colors duration-200"
      aria-label="Twitter"
    >
      <Twitter className="h-5 w-5" />
    </a>
    <a 
      href="#" 
      className="text-slate-900 hover:text-blue-400 transition-colors duration-200"
      aria-label="Facebook"
    >
      <Facebook className="h-5 w-5" />
    </a>
    <a 
      href="#" 
      className="text-slate-900 hover:text-pink-400 transition-colors duration-200"
      aria-label="Instagram"
    >
      <Instagram className="h-5 w-5" />
    </a>
    <a 
      href="#" 
      className="text-slate-900 hover:text-green-400 transition-colors duration-200"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  </div>
</div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-slate-900 flex-shrink-0" />
                <a 
                  href="mailto:hello@thenewblack.com" 
                  className="text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  hello@thenewblack.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-slate-900 flex-shrink-0" />
                <a 
                  href="tel:+2348134567890" 
                  className="text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  +234 813 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slat-900">Quick Links</h3>
            <nav className="space-y-3">
              <a 
                href="#" 
                className="block text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                About Us
              </a>
              <a 
                href="#" 
                className="block text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Services
              </a>
              <a 
                href="#" 
                className="block text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="block text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-900 text-sm">
              © {new Date().getFullYear()} Knegra Kyves. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="text-slate-900 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Cookies
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;