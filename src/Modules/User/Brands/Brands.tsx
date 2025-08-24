import { useState } from "react";
import { IBrand } from "../../../services/types";
import SpinnersCart from "../../../shared_components/SpinnersCart/SpinnersCart";
import { useBrands } from "../../../services/Brands_Categories/Hooks/Brands";

export default function Brands() {
  // ✅ استدعاء الـ hook اللي بيجيب الـ brands
  const { data, isLoading, isError, error } = useBrands();

  // ✅ لو رجعت داتا من API
  const brands: IBrand[] = data?.data?.data || [];

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 12;

  // ✅ slice عشان نعرض البيانات حسب الصفحة
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  const totalPages = Math.ceil(brands.length / brandsPerPage);

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

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
      <h1 className="text-4xl text-center font-bold text-orange-600 mb-6">
        🏷️ All Brands
      </h1>

      {/* ✅ عرض الـ Brands */}
      {brands.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {currentBrands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center p-4"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-24 h-24 object-contain mb-3"
              />
              <p className="text-gray-700 font-medium text-center">{brand.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          🚫 there is no data
        </div>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1
                ? "bg-orange-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
