import { useFormik } from 'formik';
import { signupSchema } from '../../../services/Auth/validation';
import { useSignup } from '../../../services/Auth/Hooks/useSignup';
import { SignupPayload } from '../../../services/types';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/userContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import register from '../../../assets/images/register-e4QOwQg5.webp';
import { getGuestCart, getGuestWishlist, clearAllGuestData, hasGuestData } from '../../../services/GuestStorage/guestStorage';
import { addItemToCart } from '../../../services/Cart/CartApi';
import { addItemToWishlist } from '../../../services/Wishlist/WishlistApi';

export default function Signup() {
    const { mutate, isPending } = useSignup();
    const navigate = useNavigate();
    const { setUserLogin } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Sync guest data to API
    const syncGuestData = async (token: string) => {
        const guestCart = getGuestCart();
        const guestWishlist = getGuestWishlist();

        if (guestCart.length === 0 && guestWishlist.length === 0) {
            return;
        }

        setIsSyncing(true);

        try {
            // Sync cart items
            for (const item of guestCart) {
                try {
                    await addItemToCart({ productId: item.productId, count: item.count });
                } catch (error) {
                    console.error('Failed to sync cart item:', item.productId, error);
                }
            }

            // Sync wishlist items
            for (const item of guestWishlist) {
                try {
                    await addItemToWishlist({ productId: item.productId });
                } catch (error) {
                    console.error('Failed to sync wishlist item:', item.productId, error);
                }
            }

            // Clear guest data after successful sync
            clearAllGuestData();

            if (guestCart.length > 0 || guestWishlist.length > 0) {
                toast.success(`Synced ${guestCart.length} cart items and ${guestWishlist.length} wishlist items!`);
            }
        } catch (error) {
            console.error('Error syncing guest data:', error);
        } finally {
            setIsSyncing(false);
        }
    };

    function handleSubmit(values: SignupPayload) {
        mutate(values, {
            onSuccess: async (response) => {
                toast.success("Signup successful! 🎉");
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                setUserLogin(response.token);

                // Sync guest data if exists
                if (hasGuestData()) {
                    await syncGuestData(response.token);
                }

                navigate("/");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Signup failed! ❌");
            }
        });
    }

    let Formik = useFormik<SignupPayload>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        onSubmit: handleSubmit,
        validationSchema: signupSchema
    });

    return (
        <div className="flex flex-col md:flex-row justify-center items-center bg-green-50 dark:bg-gray-900 rounded-4xl my-10 p-5 max-w-6xl mx-auto shadow-lg shadow-green-400 dark:shadow-green-400">



            {/* Form Section */}
            <form
                onSubmit={Formik.handleSubmit}
                className=" md:w-1/1 bg-green-50 dark:bg-gray-900 p-8 md:p-12 rounded-lg"
            >
                <h1 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-600 text-center md:text-left">
                    Signup
                </h1>

                {/* Name Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.name}
                        onChange={Formik.handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-green-500 focus:outline-none focus:ring-0 
                        focus:border-green-600 peer"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 
                        peer-focus:dark:text-green-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Full Name
                    </label>
                    {Formik.touched.name && Formik.errors.name && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.name}
                        </div>
                    )}
                </div>

                {/* Email Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-green-500 focus:outline-none focus:ring-0 
                        focus:border-green-600 peer"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 
                        peer-focus:dark:text-green-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                    {Formik.touched.email && Formik.errors.email && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.email}
                        </div>
                    )}
                </div>

                {/* Password Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.password}
                        onChange={Formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-green-500 focus:outline-none focus:ring-0 
                        focus:border-green-600 peer pr-8"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 
                        peer-focus:dark:text-green-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>

                    {/* Eye Icon Toggle for Password */}
                    <button
                        type="button"
                        className="absolute right-0 top-3 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                    >
                        {showPassword ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />}
                    </button>

                    {Formik.touched.password && Formik.errors.password && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.password}
                        </div>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.rePassword}
                        onChange={Formik.handleChange}
                        type={showRePassword ? "text" : "password"}
                        name="rePassword"
                        id="rePassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-green-500 focus:outline-none focus:ring-0 
                        focus:border-green-600 peer pr-8"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="rePassword"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 
                        peer-focus:dark:text-green-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Confirm Password
                    </label>

                    {/* Eye Icon Toggle for Confirm Password */}
                    <button
                        type="button"
                        className="absolute right-0 top-3 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 focus:outline-none"
                        onClick={() => setShowRePassword(!showRePassword)}
                        disabled={isPending}
                    >
                        {showRePassword ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />}
                    </button>

                    {Formik.touched.rePassword && Formik.errors.rePassword && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.rePassword}
                        </div>
                    )}
                </div>

                {/* Phone Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.phone}
                        onChange={Formik.handleChange}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-green-500 focus:outline-none focus:ring-0 
                        focus:border-green-600 peer"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 
                        peer-focus:dark:text-green-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Phone
                    </label>
                    {Formik.touched.phone && Formik.errors.phone && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.phone}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 text-center text-white 
                    bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                    focus:ring-green-300 font-medium rounded-lg text-sm 
                    dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    {isPending ? "Creating account..." : "Sign Up"}
                </button>
            </form>

            {/* Lottie Section */}

            <div className="w-full md:w-1/1 flex justify-center items-center p-5">
                <img src={register} alt="" className="max-w-lg md:max-w-2xl w-full" />
            </div>

        </div>
    );
}