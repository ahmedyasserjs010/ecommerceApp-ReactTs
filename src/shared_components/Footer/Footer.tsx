import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaCcPaypal,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

import logo from "../../assets/images/mainLogo.png"


export default function Footer() {
  return (
    <footer className="bg-orange-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-8 transition-colors duration-300 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-4">
        {/* Text and App Link */}
        <div className="flex flex-col gap-3 w-full lg:w-1/3">
          <h2 className="font-semibold text-lg text-orange-700 dark:text-orange-400">
            Get the RIOMax app
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Email.."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            <button className="bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400 text-white px-4 py-2 rounded-r-md transition-colors duration-300">
              Share App Link
            </button>
          </div>
        </div>

        {/* App Store Icons */}
        <div className="flex items-center gap-6 w-full lg:w-1/3 justify-center">
          <span className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <img src={logo} alt="FreshCart" className="w-44" />
            {/* <span className="text-orange-600" >RIO</span><span className="text-gray-500 dark:text-gray-200" >Max</span> */}
          </span>
        </div>

        <div className="flex items-center gap-6 w-full lg:w-1/3 justify-center lg:justify-end text-gray-700 dark:text-gray-300">
          <FaCcPaypal size={36} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300" />
          <FaCcMastercard size={36} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300" />
          <FaCcAmex size={36} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300" />
        </div>
      </div>

      {/* Small bottom text */}
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
