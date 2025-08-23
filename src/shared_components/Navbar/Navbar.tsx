import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import DarkModeBtn from "../DarkModeBtn";

import { FaShoppingCart } from "react-icons/fa";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/cart", label: "Cart" },
    { path: "/brands", label: "Brands" },
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
    { path: "/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md w-full transition-colors duration-300">
      <div className="container mx-auto flex justify-between gap-2 items-center py-4">
        {/* Logo */}
    <Link to="/" className="flex items-center">
      <span className="text-3xl font-bold dark:text-white flex items-center gap-2">
        <FaShoppingCart className="text-green-600 dark:text-green-400" />
        FreshCart
      </span>
    </Link>

        {/* 
<div>
          <img src={logo} alt="FreshCart" />

</div> */}
        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* زرار الدارك مود */}
          <DarkModeBtn />

          <button className="cursor-pointer text-gray-600 dark:text-gray-200 text-2xl font-medium hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300">
            Logout
          </button>
          <div className="flex space-x-3 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
            <FaTwitter className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
            <FaInstagram className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="cursor-pointer lg:hidden text-2xl text-green-600 dark:text-green-400"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={` lg:hidden flex flex-col items-center text-center bg-green-50 dark:bg-gray-900 px-6 pb-3 space-y-4 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                ? "bg-green-600 text-white shadow-md w-[30%]"
                : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300 w-[60%]"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <hr className="my-2 border-green-400 dark:border-green-700" />

        <button className="cursor-pointer w-full text-center text-2xl font-medium text-gray-600 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300">
          Logout
        </button>

        {/* زرار الدارك مود في الموبايل */}
        <DarkModeBtn />

        <div className="flex space-x-4 text-xl">
          <FaFacebookF className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
          <FaTwitter className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
          <FaInstagram className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
          <FaLinkedinIn className="cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
        </div>
      </div>
    </nav>
  );
}
