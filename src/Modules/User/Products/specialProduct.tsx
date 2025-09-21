import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { RingLoader } from 'react-spinners';
import { useProductById, useProducts } from '../../../services/Products/Hooks/useProducts';
import axios from 'axios';
import toast from 'react-hot-toast';
import SpinnersCart from '../../../shared_components/SpinnersCart/SpinnersCart';
import { FaCartPlus, FaHeart } from 'react-icons/fa';

interface Product {
  id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  category: {
    name: string;
  };
  price: number;
  ratingsAverage: number;
}

export default function SpecialProduct() {
  const { id, category } = useParams<{ id: string; category: string }>();
  
  // Use React Query for single product
  const { data: productData, isLoading: productLoading, isError: productError } = useProductById(id);
  const { data: productsData, isLoading: productsLoading, isError: productsError } = useProducts();

  // Use traditional state for related products (like in ProductDetails)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  
  // State for cart and wishlist operations
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [likingProductId, setLikingProductId] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // Fetch related products using axios (same as ProductDetails)
  useEffect(() => {
    if (category) {
      setRelatedLoading(true);
      axios
        .get('https://ecommerce.routemisr.com/api/v1/products')
        .then(({ data }) => {
          const sameCategoryProducts = data.data.filter(
            (product: Product) => product.category.name === category && product.id !== id
          );
          setRelatedProducts(sameCategoryProducts);
          setRelatedLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRelatedLoading(false);
        });
    }
  }, [category, id]);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    setLoadingProductId(product.id);
    // Simulate API call
    setTimeout(() => {
      toast.success("Added to cart!", { duration: 1000, position: 'top-center' });
      setLoadingProductId(null);
    }, 1000);
  };

  // Handle like product
  const handleLikeProduct = (product: Product) => {
    setLikingProductId(product.id);
    // Simulate API call
    setTimeout(() => {
      const newLikedProducts = new Set(likedProducts);
      if (newLikedProducts.has(product.id)) {
        newLikedProducts.delete(product.id);
        toast.success("Removed from wishlist!", { duration: 1000, position: 'top-center' });
      } else {
        newLikedProducts.add(product.id);
        toast.success("Added to wishlist!", { duration: 1000, position: 'top-center' });
      }
      setLikedProducts(newLikedProducts);
      setLikingProductId(null);
    }, 1000);
  };

  // Show loading if either product or related products are loading
  if (productLoading || relatedLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <SpinnersCart />
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Error loading product details
        </h2>
      </div>
    );
  }

  // Extract product details from React Query response (same structure as ProductDetails)
  const productDetails: Product = productData?.data.data;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {productDetails && (
        <div className="flex flex-col lg:flex-row items-center justify-evenly gap-6 p-4">
          <div className="w-full lg:w-1/2 max-w-md">
            {productDetails.images && (
              <Swiper
                navigation={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Navigation, Autoplay]}
                className="mySwiper rounded-lg shadow-lg"
              >
                {productDetails.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={img} 
                      alt={productDetails.title} 
                      className="w-full h-auto rounded-lg" 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
              {productDetails.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">
              {productDetails.description}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-xl mb-4 transition-colors duration-300">
              {productDetails.price} EGP
            </p>
            <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 text-lg mb-6">
              <span>★</span>
              <span>{productDetails.ratingsAverage?.toFixed(1)}</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleAddToCart(productDetails)}
                disabled={loadingProductId === productDetails.id}
                className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 text-white px-6 py-2 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingProductId === productDetails.id ? (
                  <RingLoader size={20} color="#fff" />
                ) : (
                  <>
                    <FaCartPlus className="inline mr-2" /> Add to cart
                  </>
                )}
              </button>
              <button 
                onClick={() => handleLikeProduct(productDetails)}
                disabled={likingProductId === productDetails.id}
                className={`${likedProducts.has(productDetails.id) ? 'bg-red-600 dark:bg-red-500' : 'bg-green-600 dark:bg-green-500'} hover:bg-green-700 dark:hover:bg-green-400 text-white px-6 py-2 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {likingProductId === productDetails.id ? (
                  <RingLoader size={20} color="#fff" />
                ) : (
                  <>
                    <FaHeart className="inline mr-2" /> 
                    {likedProducts.has(productDetails.id) ? "Remove from wishlist" : "Add to wishlist"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {relatedProducts.map((product: Product) => (
            <Link key={product.id} to={`/special-products/${product.id}/${product.category?.name}`}>
              <div className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-green-500/20 dark:shadow-green-400/10 flex flex-col items-center text-center hover:shadow-lg dark:hover:shadow-green-400/20 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                <img 
                  src={product.imageCover} 
                  alt={product.title} 
                  className="w-full transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute top-10 left-0 right-0 flex justify-between px-3 z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    disabled={loadingProductId === product.id}
                    className="bg-green-500 dark:bg-green-600 text-white font-semibold px-2 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-500 transition-all duration-500 transform -translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Add to Cart"
                  >
                    {loadingProductId === product.id ? (
                      <RingLoader size={20} color="#fff" />
                    ) : (
                      <FaCartPlus className="text-2xl" />
                    )}
                  </button>

                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLikeProduct(product);
                    }}
                    disabled={likingProductId === product.id}
                    className={`${likedProducts.has(product.id) ? 'bg-red-500 dark:bg-red-600' : 'bg-green-500 dark:bg-green-600'} text-white font-semibold px-2 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-500 transition-all duration-500 transform translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={likedProducts.has(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {likingProductId === product.id ? (
                      <RingLoader size={20} color="#fff" />
                    ) : (
                      <FaHeart className={`text-2xl ${likedProducts.has(product.id) ? 'text-white' : ''}`} />
                    )}
                  </button>
                </div>
                <div className="p-5 flex flex-col items-center text-center">
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium transition-colors duration-300">
                    {product?.category?.name}
                  </p>
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-sm truncate w-full transition-colors duration-300">
                    {product.title.split(' ').slice(0, 3).join(' ')}...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 transition-colors duration-300">
                    {product.price} EGP
                  </p>
                  <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 text-sm mt-2">
                    <span>★</span>
                    <span>{product.ratingsAverage?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {relatedProducts.length === 0 && !relatedLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No related products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}