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
        © {new Date().getFullYear()} RIOMax . All rights reserved.
      </div>
    </footer>
  );
}
