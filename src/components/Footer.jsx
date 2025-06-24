import React from "react";
import {
  FaDiscord,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-700 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-300">
            © {new Date().getFullYear()} GitHub Project Explorer. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaDiscord size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
