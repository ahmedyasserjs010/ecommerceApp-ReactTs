// DarkModeBtn.jsx

import { Sun, Moon } from "lucide-react";
import useTheme from "../contexts/themeContext";

const DarkModeBtn = ({setIsOpen}) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
onClick={() => {
  setIsOpen(false);
  toggleDarkMode();
}}
      className={`  relative w-32 h-14 flex items-center px-2 rounded-full shadow-xl hover:cursor-pointer transition-all duration-300
        ${
          darkMode
            ? "bg-gradient-to-r from-gray-600 to-gray-800 text-green-400"
            : "bg-gradient-to-r from-green-300 to-green-500 text-gray-800"
        }`}
    >
      {/* الكرة المتحركة */}
      <div
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
          ${darkMode ? "translate-x-16 bg-gray-800" : "translate-x-0 bg-white"}`}
      >
        {darkMode ? (
          <Moon size={28} className="text-green-400" />
        ) : (
          <Sun size={28} className="text-yellow-500" />
        )}
      </div>

      {/* الأيقونات على الجانبين */}
      <div className="flex w-full justify-between items-center px-5 font-semibold">
        <Sun size={24} className={darkMode ? "text-gray-400" : "text-yellow-500"} />
        <Moon size={24} className={darkMode ? "text-green-600" : "text-gray-600"} />
      </div>
    </button>
  );
};

export default DarkModeBtn;
