import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FaBars, FaTimes, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaCartPlus, FaHeart } from "react-icons/fa";
import DarkModeBtn from "../DarkModeBtn"
import { useDisplayWishlist } from "../../services/Wishlist/Hooks/useWishlist";
import { FaShoppingCart } from "react-icons/fa";

// import { FaShoppingCart } from "react-icons/fa";
import { UserContext } from "../../contexts/userContext";
import Swal from "sweetalert2";
import { useDisplayCartItems } from "../../services/Cart/Hooks/useCart";
import { ICartProduct } from "../../services/types";
import { getGuestCart, getGuestWishlist } from "../../services/GuestStorage/guestStorage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const { data: wishlistData } = useDisplayWishlist();
  const { data, isLoading, error } = useDisplayCartItems();

  const products: ICartProduct[] = data?.data?.products || [];

  // Guest counts
  const [guestCartCount, setGuestCartCount] = useState(0);
  const [guestWishlistCount, setGuestWishlistCount] = useState(0);

  // Update guest counts periodically
  useEffect(() => {
    const updateGuestCounts = () => {
      if (!userLogin) {
        setGuestCartCount(getGuestCart().reduce((sum, item) => sum + item.count, 0));
        setGuestWishlistCount(getGuestWishlist().length);
      }
    };

    updateGuestCounts();
    const interval = setInterval(updateGuestCounts, 1000);
    return () => clearInterval(interval);
  }, [userLogin]);

  // Get counts based on login status
  const cartCount = userLogin ? products.reduce((sum, item) => sum + item.count, 0) : guestCartCount;
  const wishlistCount = userLogin ? (wishlistData?.count || 0) : guestWishlistCount;

  function LogOut() {
    Swal.fire({
      title: 'Are you sure you want to log out? 🤔',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '🚪 Logout',
      cancelButtonText: '🏠 Stay Here',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 transition-all duration-200 focus:outline-none border-none',
        cancelButton: 'bg-gray-100 text-gray-700 font-medium px-5 py-2 rounded-md hover:bg-gray-200 transition-all duration-200 border border-gray-300',
        actions: 'space-x-4'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setUserLogin(null);
        navigate('/login');
      }
    });
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/brands", label: "Brands" },
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
  ];

  return (
    <nav className="bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md w-full transition-colors duration-300 py-3">
      <div className="container mx-auto flex justify-between gap-2 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <FaShoppingCart className="text-green-600" />

            <div className="flex">
              <span className="text-green-600">Fresh</span>
              <span className="text-gray-500 dark:text-gray-200">Cart</span>
            </div>

          </span>
        </Link>

        {/* 
<div>
          <img src={logo} alt="FreshCart" />

</div> */}
        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {
            userLogin === null ?
              <div className="flex gap-1">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300"
                    }`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300"
                    }`
                  }
                >
                  Signup
                </NavLink>
              </div> : null}


          <div className="flex space-x-4 text-xl">
            {/* Cart Icon */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative transition-all duration-300 ${isActive ? "scale-125 text-green-600 dark:text-green-300" : ""}`
              }
            >
              <FaCartPlus className="cursor-pointer text-3xl hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
              {/* Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Wishlist Icon */}
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `relative transition-all duration-300 ${isActive ? "scale-125 text-green-600 dark:text-green-300" : ""}`
              }
            >
              <FaHeart className="cursor-pointer text-3xl hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
              {/* Badge */}
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </NavLink>
          </div>
          {/* زرار الدارك مود */}
          <DarkModeBtn setIsOpen={setIsOpen} />

          {
            userLogin !== null ?
              <button onClick={LogOut} className="cursor-pointer text-gray-600 dark:text-gray-200 text-2xl font-medium hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300">
                Logout
              </button> : null
          }

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="cursor-pointer lg:hidden text-2xl text-green-600 dark:text-green-400"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={` lg:hidden flex flex-col items-center text-center bg-green-50 dark:bg-gray-900 px-6 pb-3 space-y-4 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                ? "bg-green-600 text-white shadow-md w-[30%]"
                : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300 w-[60%]"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <hr className="my-2 dark:border-green-500 border-green-700 border-2 rounded-4xl w-50" />


        {userLogin === null && (
          <div className="flex gap-1">
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "hover:bg-green-100 hover:dark:bg-green-800 hover:text-green-600 dark:hover:text-green-300"
                }`
              }
            >
              Signup
            </NavLink>
          </div>
        )}

        <div className="flex space-x-4 text-xl">
          {/* Cart Icon */}
          <NavLink
            onClick={() => setIsOpen(false)}
            to="/cart"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${isActive ? "scale-125 text-green-600 dark:text-green-300" : ""}`
            }
          >
            <FaCartPlus className="cursor-pointer text-3xl hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
            {/* Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Wishlist Icon */}
          <NavLink
            onClick={() => setIsOpen(false)}
            to="/wishlist"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${isActive ? "scale-125 text-green-600 dark:text-green-300" : ""}`
            }
          >
            <FaHeart className="cursor-pointer text-3xl hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300" />
            {/* Badge */}
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* زرار الدارك مود في الموبايل */}
        <DarkModeBtn setIsOpen={setIsOpen} />

        {userLogin !== null && (
          <button onClick={LogOut} className="cursor-pointer w-full text-center text-2xl font-medium text-gray-600 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300">
            Logout
          </button>
        )}


      </div>
    </nav>
  );
}
