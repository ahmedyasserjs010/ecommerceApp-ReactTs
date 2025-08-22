import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaCcPaypal,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-8 transition-colors duration-300 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-4">
        {/* Text and App Link */}
        <div className="flex flex-col gap-3 w-full lg:w-1/3">
          <h2 className="font-semibold text-lg text-green-700 dark:text-green-400">
            Get the FreshCart app
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Email.."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <button className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 text-white px-4 py-2 rounded-r-md transition-colors duration-300">
              Share App Link
            </button>
          </div>
        </div>

        {/* App Store Icons */}
        <div className="flex items-center gap-6 w-full lg:w-1/3 justify-center">
          <a
            href="#"
            title="Download on the Apple App Store"
            className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
          >
            <FaApple size={36} />
          </a>
          <a
            href="#"
            title="Get it on Google Play"
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
          >
            <FaGooglePlay size={36} />
          </a>
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
