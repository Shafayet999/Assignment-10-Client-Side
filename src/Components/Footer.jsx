import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import logo from "/logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-14 border-t border-gray-300">
      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-3">

        {/* LOGO + BRAND */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="logo" className="w-20 h-16" />
            <h2 className="text-2xl font-bold orrange">Food Lover</h2>
          </div>
          <p className="text-gray-600 text-sm">
            The best place to explore delicious foods, honest reviews,  
            and top-rated restaurants around you.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-3 orrange">Contact Info</h2>
          <p>Email: support@foodlover.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-3 orrange">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-5 text-2xl mb-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-700 transition" />
            </a>
          </div>

          <h2 className="text-xl font-bold orrange mb-2">Privacy & Policy</h2>
          <p className="text-sm text-gray-600">
            We respect your privacy and are committed to protecting your personal data.
          </p>
        </div>
      </div>

      
      <div className="text-center py-4 bg-base-300 mt-5">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="orrange font-bold">Food Lover</span>.  
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
