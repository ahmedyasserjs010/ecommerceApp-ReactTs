import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaHeart, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RingLoader } from 'react-spinners';
import toast from 'react-hot-toast';

// Static data for now - you can replace this with real data later
const staticWishlistItems = [
  {
    id: "6428e997dc1175abc65ca0a1",
    title: "Woman Shawl Premium Quality",
    quantity: 220,
    price: 149,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-products/1680402838276-cover.jpeg",
    category: {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      slug: "women's-fashion"
    },
    brand: {
      _id: "64089bbe24b25627a253158b",
      name: "DeFacto",
      slug: "defacto"
    },
    ratingsAverage: 4.8
  },
  {
    id: "6428eb43dc1175abc65ca0b3",
    title: "Woman Elegant Shawl",
    quantity: 180,
    price: 149,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg",
    category: {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      slug: "women's-fashion"
    },
    brand: {
      _id: "64089bbe24b25627a253158b",
      name: "DeFacto",
      slug: "defacto"
    },
    ratingsAverage: 4.8
  },
  {
    id: "6428e319dc1175abc65ca06d",
    title: "Woman Karma Socks Multicolour",
    quantity: 117,
    price: 199,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-products/1680401176411-cover.jpeg",
    category: {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      slug: "women's-fashion"
    },
    brand: {
      _id: "64089bbe24b25627a253158b",
      name: "DeFacto",
      slug: "defacto"
    },
    ratingsAverage: 4.3
  },
  {
    id: "6428e4d9dc1175abc65ca077",
    title: "Logo T-Shirt orange",
    quantity: 95,
    price: 299,
    imageCover: "http://ecommerce.routemisr.com/Route-Academy-products/1680396593789-cover.jpeg",
    category: {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Logo T-Shirt orange",
      slug: "Logo T-Shirt orange"
    },
    brand: {
      _id: "64089bbe24b25627a253158b",
      name: "DeFacto",
      slug: "defacto"
    },
    ratingsAverage: 4.5
  }
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(staticWishlistItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [removingProductId, setRemovingProductId] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    setLoadingProductId(product.id);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`${product.title} added to cart successfully!`);
      setLoadingProductId(null);
    }, 1000);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setRemovingProductId(productId);
    
    // Simulate API call
    setTimeout(() => {
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
      toast.success("Item removed from wishlist!");
      setRemovingProductId(null);
    }, 500);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const filteredItems = wishlistItems.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-bold text-orange-600 dark:text-orange-400 mb-6 transition-colors duration-300">
           <FaHeart className="inline-block mr-2 text-red-500" />
           My Wishlist
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
          />
        </div>

        {/* Wishlist Counter */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            You have <span className="font-bold text-orange-600 dark:text-orange-400">{filteredItems.length}</span> items in your wishlist
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredItems.map((product, index: number) => (
            <div
              key={product.id}
              className="border border-gray-300 dark:border-gray-600 px-4 relative group bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-orange-500/20 dark:shadow-orange-400/10 flex flex-col items-center text-center hover:shadow-lg dark:hover:shadow-orange-400/20 transition-all duration-300 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Action Buttons */}
              <div className="absolute top-10 left-0 right-0 flex justify-between px-3 z-10">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={loadingProductId === product.id}
                  className="bg-orange-500 dark:bg-orange-600 text-white font-semibold px-2 py-2 rounded-md hover:bg-orange-700 dark:hover:bg-orange-500 transition-all duration-500 transform -translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Add to Cart"
                >
                  {loadingProductId === product.id ? (
                    <RingLoader size={20} color="#fff" />
                  ) : (
                    <FaCartPlus className="text-2xl" />
                  )}
                </button>

                <button 
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  disabled={removingProductId === product.id}
                  className="bg-red-500 dark:bg-red-600 text-white font-semibold px-2 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-500 transition-all duration-500 transform translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Remove from Wishlist"
                >
                  {removingProductId === product.id ? (
                    <RingLoader size={20} color="#fff" />
                  ) : (
                    <FaTrash className="text-2xl" />
                  )}
                </button>
              </div>

              {/* Wishlist Heart Icon */}
              <div className="absolute top-2 right-2 z-10">
                <FaHeart className="text-orange-500 dark:text-orange-400 text-xl drop-shadow-md" />
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
                  <p className="text-orange-600 dark:text-orange-400 text-sm font-medium transition-colors duration-300 mb-2">
                    {product?.category?.name}
                  </p>
                  
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem] transition-colors duration-300">
                    {product.title.split(' ').slice(0, 4).join(' ')}
                    {product.title.split(' ').length > 4 && '...'}
                  </h3>
                  
                  <div className="mt-auto">
                    <p className="text-gray-900 dark:text-white text-lg font-bold mb-2 transition-colors duration-300">
                      {product.price} EGP
                    </p>
                    
                    <div className="flex items-center justify-center gap-1 text-yellow-500 dark:text-yellow-400 text-sm">
                      <span>★</span>
                      <span>{product.ratingsAverage?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty States */}
        {filteredItems.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-2">
              No items found matching "{searchTerm}"
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Try searching with different keywords
            </p>
          </div>
        )}

        {wishlistItems.length === 0 && !searchTerm && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">
              Your wishlist is empty
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
              Start adding products you love to your wishlist
            </p>
            <Link 
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Clear All Button */}
        {wishlistItems.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setWishlistItems([]);
                toast.success("Wishlist cleared!");
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Clear All Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}