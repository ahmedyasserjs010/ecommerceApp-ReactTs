import { useState } from "react";
import { IBrand } from "../../../services/types";
import SpinnersCart from "../../../shared_components/SpinnersCart/SpinnersCart";
import { useBrands } from "../../../services/Brands_Categories/Hooks/Brands";
import { motion, AnimatePresence } from "framer-motion";

export default function Brands() {
  // ✅ استدعاء الـ hook اللي بيجيب الـ brands
  const { data, isLoading, isError, error } = useBrands();

  // ✅ لو رجعت داتا من API
  const brands: IBrand[] = data?.data?.data || [];

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0); // 0: initial, 1: next, -1: prev
  const brandsPerPage = 12;

  // ✅ slice عشان نعرض البيانات حسب الصفحة
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  const totalPages = Math.ceil(brands.length / brandsPerPage);

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      // تحديد اتجاه الحركة
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // ✅ Animation variants
  const containerVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05,
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // ✅ loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <SpinnersCart />
      </div>
    );
  }

  // ✅ error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-red-600">
        ❌ Error: {(error as Error).message}
      </div>
    );
  }

  // ✅ render
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl text-center font-bold text-green-600 mb-6"
      >
        🏷️ All Brands
      </motion.h1>

      {/* ✅ عرض الـ Brands */}
      {brands.length > 0 ? (
        <>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {currentBrands.map((brand) => (
                <motion.div
                  key={brand._id}
                  variants={itemVariants}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center p-4 hover:scale-105 transform transition-transform"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <p className="text-gray-700 font-medium text-center">{brand.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ✅ Pagination */}
          <motion.div 
            variants={paginationVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center items-center mt-8 space-x-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </motion.button>

            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                  } transition-all duration-200`}
              >
                {index + 1}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200 flex items-center"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-500 py-10"
        >
          🚫 there is no data
        </motion.div>
      )}
    </div>
  );
}