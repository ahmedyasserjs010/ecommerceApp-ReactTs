//. Products Component

import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useProducts } from '../../../services/Products/Hooks/useProducts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SpinnersCart from '../../../shared_components/SpinnersCart/SpinnersCart';
import { useAddToCart } from '../../../services/Cart/Hooks/useCart';
import { IProduct } from '../../../services/types';
import { RingLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useAddToWishlist } from '../../../services/Wishlist/Hooks/useWishlist';
import { useDisplayWishlist } from "../../../services/Wishlist/Hooks/useWishlist";

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [likingProductId, setLikingProductId] = useState<string | null>(null); // حالة جديدة للتحميل أثناء الإعجاب
  const [displayedItemsCount, setDisplayedItemsCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { data: wishlistData } = useDisplayWishlist();

  const wishlistIds = new Set(wishlistData?.data?.map((item) => item.productId));


  // حالة جديدة لتخزين المنتجات المعجبة
  // const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const ITEMS_PER_LOAD = 10;

  const handleAddToCart = (product: IProduct) => {
    setLoadingProductId(product.id);

    addToCart({
      productId: product.id,
      count: 1
    }, {
      onSuccess: () => {
        toast.success(`${product.title} added to cart successfully!`);
        setLoadingProductId(null);
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to add product to cart');
        setLoadingProductId(null);
      },
    });
  };

  // دالة جديدة للتعامل مع الإعجاب
  const handleLikeProduct = (product: IProduct) => {
    setLikingProductId(product.id);

    addToWishlist({
      productId: product.id,
    }, {
      onSuccess: () => {
        toast.success(`${product.title} added to favorites!`);
        setLikingProductId(null);
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to add product to favorites');
        setLikingProductId(null);
      },
    });

  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayedItemsCount(prev => prev + ITEMS_PER_LOAD);
      setIsLoadingMore(false);

      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }, 200);
  };

  const resetPagination = () => {
    setDisplayedItemsCount(6);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    resetPagination();
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <SpinnersCart />
      </div>
    );
  }

  if (isError) {
    return (
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600 dark:text-red-400 bg-white dark:bg-gray-900 min-h-screen pt-20">
        Error: {error?.message || 'Something went wrong'}
      </h2>
    );
  }

  const products: IProduct[] = data?.data?.data || [];
  const filteredProducts = products.filter((product: IProduct) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("products", products);

  const displayedProducts = filteredProducts.slice(0, displayedItemsCount);
  const hasMoreItems = displayedItemsCount < filteredProducts.length;
  const remainingItemsCount = filteredProducts.length - displayedItemsCount;









  //ANCHOR - ​‌‍‌⁡⁣⁢⁣Products List⁡​







  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-bold text-green-600 dark:text-green-400 mb-6 transition-colors duration-300">
          📦 All Products
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-300"
          />
        </div>

        {/* Results Summary */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-green-600 dark:text-green-400">{displayedProducts.length}</span> of{' '}
            <span className="font-semibold text-green-600 dark:text-green-400">{filteredProducts.length}</span> products
            {searchTerm && (
              <span> matching "<span className="font-medium text-gray-800 dark:text-gray-200">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {displayedProducts.map((product: IProduct, index: number) => (
            <div
              key={product.id}
              className="border border-gray-300 dark:border-gray-600 px-4 relative group bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-green-500/20 dark:shadow-green-400/10 flex flex-col items-center text-center hover:shadow-lg dark:hover:shadow-green-400/20 transition-all duration-300 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={(index % 12) * 100}
            >
              {/* Action Buttons */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-between px-3 z-10">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={loadingProductId === product.id}
                  className="
                            bg-green-500 dark:bg-green-600 
                            text-white font-semibold px-2 py-2 rounded-md 
                            hover:bg-green-700 dark:hover:bg-green-500 
                            transition-all duration-500 transform 
                            -translate-x-0 opacity-100
                            md:-translate-x-20 md:opacity-0 
                            md:group-hover:translate-x-0 md:group-hover:opacity-100 
                            disabled:opacity-50 disabled:cursor-not-allowed
                          "
                  title="Add to Cart"
                >
                  {loadingProductId === product.id ? (
                    <RingLoader size={20} color="#fff" />
                  ) : (
                    <FaCartPlus className="text-2xl" />
                  )}
                </button>


<button
  onClick={() => handleLikeProduct(product)}
  disabled={likingProductId === product.id}
  className={`
    ${wishlistIds.has(product.id) ? "bg-red-500 dark:bg-red-600" : "bg-green-500 dark:bg-green-600"}
    text-white font-semibold px-2 py-2 rounded-md 
    hover:bg-green-700 dark:hover:bg-green-500 
    transition-all duration-500 transform 
    translate-x-0 opacity-100 
    md:translate-x-20 md:opacity-0 
    md:group-hover:translate-x-0 md:group-hover:opacity-100 
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
  title={wishlistIds.has(product.id) ? "Already in Wishlist" : "Add to Wishlist"}
>
  {likingProductId === product.id ? (
    <RingLoader size={20} color="#fff" />
  ) : (
    <FaHeart className={`text-2xl ${wishlistIds.has(product.id) ? "text-red-500" : "text-white"}`} />
  )}
</button>


              </div>

              {/* Product Content */}
              <Link
                to={`/special-products/${product.id}/${product.category?.name}`}
                className="flex flex-col items-center text-center w-full"
              >
                <div className="w-full mb-4">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                  />
                </div>

                <div className="p-2 flex flex-col items-center text-center flex-grow">
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium transition-colors duration-300 mb-2">
                    {product?.category?.name}
                  </p>

                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem] transition-colors duration-300">
                    {product.title.split(' ').slice(0, 4).join(' ')}
                    {product.title.split(' ').length > 4 && '...'}
                  </h3>

                  <div className="mt-auto">
                    <p className=" dark:text-white text-lg font-bold mb-2 transition-colors duration-300 bg-green-600 text-white p-2 rounded-lg">
                      {product.quantity} EGP
                    </p>
                    <p className="text-gray-900 dark:text-white text-sm font-bold mb-2 transition-colors duration-300 line-through decoration-2">
                      {product.price} EGP
                    </p>

                    <div className="flex items-center justify-center gap-1 text-yellow-500 dark:text-yellow-400 text-md">
                      <span>★</span>
                      <span>{product.ratingsAverage?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreItems && (
          <div className="text-center mt-12">
            <div className="mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                {remainingItemsCount} more products available
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-md mx-auto">
                <div
                  className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(displayedItemsCount / filteredProducts.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isLoadingMore ? (
                <div className="flex items-center gap-2">
                  <RingLoader size={20} color="#fff" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Load More Products</span>
                  <span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded-full">
                    +{Math.min(ITEMS_PER_LOAD, remainingItemsCount)}
                  </span>
                </div>
              )}
            </button>
          </div>
        )}

        {/* Show All Button (when there are many items left) */}
        {hasMoreItems && remainingItemsCount > ITEMS_PER_LOAD && (
          <div className="text-center mt-4">
            <button
              onClick={() => setDisplayedItemsCount(filteredProducts.length)}
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm underline transition-colors duration-200"
            >
              Show All ({filteredProducts.length} products)
            </button>
          </div>
        )}

        {/* Back to Top Button (when many items are loaded) */}
        {displayedItemsCount > 12 && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              Back to Top ↑
            </button>
          </div>
        )}

        {/* Empty States */}
        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
              No products found matching "{searchTerm}"
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
              Try searching with different keywords
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium underline"
            >
              Clear search and show all products
            </button>
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              No products available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}