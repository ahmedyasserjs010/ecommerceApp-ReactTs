import { useEffect, useState } from "react";
import { ThemeProvider } from "../../contexts/themeContext";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContextType } from "../../Types/ThemeContextType";
import Footer from "../Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CounterProvider } from "../../contexts/useCounterContext";
import { UserContext, UserContextProvider } from "../../contexts/userContext";

const queryClient = new QueryClient();

export default function Layout() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const isDark = localStorage.getItem("darkMode");
    return isDark === "true";
  });

  const [scrolled, setScrolled] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeProvider value={{ darkMode, toggleDarkMode } as ThemeContextType}>
          <div className="flex flex-col min-h-screen">
            {/* Navbar fixed with fade effect */}
            <header
              className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
              scrolled
                ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md"
                : "bg-transparent"
            }`}
          >
            <Navbar />
          </header>

          {/* Main content in the center */}
          <main className=" mt-36 mb-10">
            <Outlet />
          </main>

          {/* Footer always at bottom */}
          <footer className="mt-auto">
            <Footer />
          </footer>

          <ReactQueryDevtools />
          <Toaster />
        </div>
      </ThemeProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
