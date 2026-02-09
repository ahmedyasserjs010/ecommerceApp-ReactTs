import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaCcPaypal,
  FaCcMastercard,
  FaCcAmex,
  FaShoppingCart,
} from "react-icons/fa";

import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-green-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-8 transition-colors duration-300 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-4">

        {/* App Store Icons */}
        <div className="flex items-center gap-6 w-full lg:w-1/3 justify-center">
          <span className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold dark:text-white flex items-center gap-2">
                <FaShoppingCart className="text-green-600" />

                <div className="flex">
                  <span className="text-green-600">Fresh</span>
                  <span className="text-gray-500 dark:text-gray-200">Cart</span>
                </div>

              </span>
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-6 w-full lg:w-1/3 justify-center lg:justify-end text-gray-700 dark:text-gray-300">
          <FaCcPaypal size={36} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300" />
          <FaCcMastercard size={36} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300" />
          <FaCcAmex size={36} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300" />
        </div>
      </div>

      {/* Small bottom text */}
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
