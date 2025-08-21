import { useEffect, useState } from "react";
import { ThemeProvider } from "../../contexts/themeContext"; // Remove extension so TS resolves .ts/.tsx
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContextType } from '../../Types/ThemeContextType';
import Footer from '../Footer/Footer';



export default function Layout() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const isDark = localStorage.getItem("darkMode");
    return isDark === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    const bodyElement = document.body;
    if (bodyElement) {
      if (darkMode) {
        bodyElement.classList.add("dark");
      } else {
        bodyElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <ThemeProvider value={{ darkMode, toggleDarkMode } as ThemeContextType}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto my-6 py-6 mt-16">
          <Outlet />
        </main>
      </div>
      <Footer/>
    </ThemeProvider>
  );
}
