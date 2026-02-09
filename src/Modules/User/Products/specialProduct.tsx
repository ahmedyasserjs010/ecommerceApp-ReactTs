import React, { useEffect, useState, useContext } from 'react';
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
import { FaCartPlus, FaHeart, FaRegHeart, FaCheck } from 'react-icons/fa';
import { UserContext } from '../../../contexts/userContext';
import { useAddToCart, useDisplayCartItems } from '../../../services/Cart/Hooks/useCart';
import { useAddToWishlist, useDisplayWishlist, useDeleteFromWishlist } from '../../../services/Wishlist/Hooks/useWishlist';
import { addToGuestCart, addToGuestWishlist, getGuestWishlist, removeFromGuestWishlist, getGuestCart } from '../../../services/GuestStorage/guestStorage';

interface Product {
  id: string;
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
  price: number;
  ratingsAverage: number;
}

export default function SpecialProduct() {
  const { id, category } = useParams<{ id: string; category: string }>();
  const { userLogin } = useContext(UserContext);

  // Use React Query for single product
  const { data: productData, isLoading: productLoading, isError: productError } = useProductById(id);

  // Use traditional state for related products
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  // State for cart and wishlist operations
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [likingProductId, setLikingProductId] = useState<string | null>(null);

  const { mutate: addToCart } = useAddToCart();
  const { data: cartData } = useDisplayCartItems();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useDeleteFromWishlist();
  const { data: wishlistData } = useDisplayWishlist();

  // Guest state
  const [guestWishlistIds, setGuestWishlistIds] = useState<Set<string>>(new Set());
  const [guestCartIds, setGuestCartIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userLogin) {
      const guestWishlist = getGuestWishlist();
      setGuestWishlistIds(new Set(guestWishlist.map(item => item.productId)));
      const guestCart = getGuestCart();
      setGuestCartIds(new Set(guestCart.map(item => item.productId)));
    }
  }, [userLogin]);

  const wishlistIds = userLogin
    ? new Set(wishlistData?.data?.map((item) => item.productId))
    : guestWishlistIds;

  const cartIds = userLogin
    ? new Set(cartData?.data?.products?.map((item) => item.product.id))
    : guestCartIds;

  // Fetch related products using axios
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

    if (userLogin) {
      addToCart({
        productId: product.id,
        count: 1
      }, {
        onSuccess: () => {
          toast.success("Added to cart!", { duration: 1000, position: 'top-center' });
          setLoadingProductId(null);
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to add to cart');
          setLoadingProductId(null);
        }
      });
    } else {
      addToGuestCart({
        productId: product.id,
        count: 1,
        product: {
          id: product.id,
          _id: product._id || product.id,
          title: product.title,
          price: product.price,
          imageCover: product.imageCover,
          category: product.category,
          brand: product.brand,
        }
      });
      setGuestCartIds(prev => new Set([...prev, product.id]));
      toast.success("Added to cart!", { duration: 1000, position: 'top-center' });
      setLoadingProductId(null);
    }
  };

  // Handle like product
  const handleLikeProduct = (product: Product) => {
    setLikingProductId(product.id);
    const isLiked = wishlistIds.has(product.id);

    if (userLogin) {
      if (isLiked) {
        removeFromWishlist(product.id, {
          onSuccess: () => {
            toast.success("Removed from wishlist!", { duration: 1000, position: 'top-center' });
            setLikingProductId(null);
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to remove from wishlist');
            setLikingProductId(null);
          }
        });
      } else {
        addToWishlist({
          productId: product.id,
        }, {
          onSuccess: () => {
            toast.success("Added to wishlist!", { duration: 1000, position: 'top-center' });
            setLikingProductId(null);
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to add to wishlist');
            setLikingProductId(null);
          }
        });
      }
    } else {
      if (isLiked) {
        removeFromGuestWishlist(product.id);
        const newSet = new Set(guestWishlistIds);
        newSet.delete(product.id);
        setGuestWishlistIds(newSet);
        toast.success("Removed from wishlist!", { duration: 1000, position: 'top-center' });
      } else {
        addToGuestWishlist({
          productId: product.id,
          product: {
            id: product.id,
            _id: product._id || product.id,
            title: product.title,
            price: product.price,
            imageCover: product.imageCover,
            category: product.category,
            brand: product.brand,
          }
        });
        setGuestWishlistIds(prev => new Set([...prev, product.id]));
        toast.success("Added to wishlist!", { duration: 1000, position: 'top-center' });
      }
      setLikingProductId(null);
    }
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

  // Extract product details from React Query response
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
                className={`${cartIds.has(productDetails.id) ? 'bg-green-800 dark:bg-green-700' : 'bg-green-600 dark:bg-green-500'} hover:bg-green-700 dark:hover:bg-green-400 text-white px-6 py-2 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loadingProductId === productDetails.id ? (
                  <RingLoader size={20} color="#fff" />
                ) : (
                  <>
                    {cartIds.has(productDetails.id) ? <FaCheck className="inline mr-2" /> : <FaCartPlus className="inline mr-2" />}
                    {cartIds.has(productDetails.id) ? "In Cart" : "Add to cart"}
                  </>
                )}
              </button>
              <button
                onClick={() => handleLikeProduct(productDetails)}
                disabled={likingProductId === productDetails.id}
                className={`${wishlistIds.has(productDetails.id) ? 'bg-red-600 dark:bg-red-500' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600'} hover:bg-red-700 dark:hover:bg-red-400 hover:text-white px-6 py-2 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {likingProductId === productDetails.id ? (
                  <RingLoader size={20} color="#fff" />
                ) : (
                  <>
                    {wishlistIds.has(productDetails.id) ? <FaHeart className="inline mr-2" /> : <FaRegHeart className="inline mr-2" />}
                    {wishlistIds.has(productDetails.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                    className={`${cartIds.has(product.id) ? 'bg-green-800 dark:bg-green-700' : 'bg-green-500 dark:bg-green-600'} text-white font-semibold px-2 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-500 transition-all duration-500 transform -translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                    title="Add to Cart"
                  >
                    {loadingProductId === product.id ? (
                      <RingLoader size={20} color="#fff" />
                    ) : (
                      cartIds.has(product.id) ? <FaCheck className="text-2xl" /> : <FaCartPlus className="text-2xl" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLikeProduct(product);
                    }}
                    disabled={likingProductId === product.id}
                    className={`${wishlistIds.has(product.id) ? 'bg-red-500 dark:bg-red-600' : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-500'} font-semibold px-2 py-2 rounded-md hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-all duration-500 transform translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={wishlistIds.has(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {likingProductId === product.id ? (
                      <RingLoader size={20} color="#fff" />
                    ) : (
                      wishlistIds.has(product.id)
                        ? <FaHeart className="text-2xl text-white" />
                        : <FaRegHeart className="text-2xl" />
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