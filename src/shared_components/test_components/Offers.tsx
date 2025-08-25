import React from 'react';
import logo from "../../assets/images/mainLogo.png"
import offer1 from "../../assets/images/Offers/offer1.png"
import offer2 from "../../assets/images/Offers/offer2.png"
import offer3 from "../../assets/images/Offers/offer3.png"
import offer4 from "../../assets/images/Offers/offer4.png"
import { Link } from 'react-router-dom';

export default function Offers() {
  return (
    <div className="px-6 py-10">
      {/* ===== Logo & Title ===== */}
      <Link to="/" className="flex justify-center mb-10">
        <span className="flex items-center gap-3 border-4 border-orange-600 px-8 py-4 rounded-3xl shadow-lg hover:shadow-orange-300 transition-all duration-300">
          <img src={logo} alt="FreshCart" className="w-20" />
          <div className="flex text-5xl font-bold">
            <span className="text-orange-600">RIO</span>
            <span className="text-gray-600 dark:text-gray-200">Max</span>
          </div>
        </span>
      </Link>

      {/* ===== Offers Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {[offer1, offer2, offer3, offer4].map((offer, index) => (
          <div
            key={index}
            className="border-4 h-[42rem] border-orange-400 rounded-2xl overflow-hidden flex justify-center items-center bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={offer}
              alt={`Offer ${index + 1}`}
              className="object-contain w-full "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
