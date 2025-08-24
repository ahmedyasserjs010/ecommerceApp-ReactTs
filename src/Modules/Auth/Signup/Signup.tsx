///ANCHOR -  Signup

import { useFormik } from 'formik';
import { signupSchema } from '../../../services/Auth/validation';
import { useSignup } from '../../../services/Auth/Hooks/useSignup';
import { SignupPayload } from '../../../services/types';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/userContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Signup() {

    const { mutate,isPending } = useSignup();
    const navigate = useNavigate();
    const { setUserLogin } = useContext(UserContext);

    function clearLocalStorage() {
        localStorage.clear();
    }

    useEffect(() => {
        clearLocalStorage();
    }, [])


    function handleSubmit(values: SignupPayload) {
        mutate(values, {
            onSuccess: (response) => {
                toast.success("Signup successful! 🎉");
                // حفظ بيانات اليوزر
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                console.log(response.user);
                console.log(response.token);
                setUserLogin(response.token); // Set user token in context
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
  <div className="flex flex-col md:flex-row justify-center items-center bg-orange-50 dark:bg-gray-900 shadow-lg shadow-orange-400 dark:shadow-orange-400 rounded-4xl my-10 p-5 max-w-6xl mx-auto">
    
    {/* Lottie Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center p-5">
      <DotLottieReact
        src="https://lottie.host/04472efa-753d-4fc0-85bc-257a17bbc0ed/mrIwGSEd4r.lottie"
        loop
        autoplay
        className="max-w-lg md:max-w-2xl w-full"
      />
    </div>

    {/* Form Section */}
    <form
      onSubmit={Formik.handleSubmit}
      className="w-full md:w-1/2 bg-orange-50 dark:bg-gray-900 p-8 md:p-12 rounded-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-orange-700 dark:text-orange-600 text-center md:text-left">
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
          dark:focus:border-orange-500 focus:outline-none focus:ring-0 
          focus:border-orange-600 peer"
          placeholder=" "
          disabled={isPending}
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 
          dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
          -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
          peer-focus:dark:text-orange-500 
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
          dark:focus:border-orange-500 focus:outline-none focus:ring-0 
          focus:border-orange-600 peer"
          placeholder=" "
          disabled={isPending}
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 
          dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
          -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
          peer-focus:dark:text-orange-500 
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
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
          border-0 border-b-2 border-gray-300 appearance-none 
          dark:text-white dark:border-gray-600 
          dark:focus:border-orange-500 focus:outline-none focus:ring-0 
          focus:border-orange-600 peer"
          placeholder=" "
          disabled={isPending}
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 
          dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
          -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
          peer-focus:dark:text-orange-500 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
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
          type="password"
          name="rePassword"
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
          border-0 border-b-2 border-gray-300 appearance-none 
          dark:text-white dark:border-gray-600 
          dark:focus:border-orange-500 focus:outline-none focus:ring-0 
          focus:border-orange-600 peer"
          placeholder=" "
          disabled={isPending}
        />
        <label
          htmlFor="rePassword"
          className="peer-focus:font-medium absolute text-sm text-gray-500 
          dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
          -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
          peer-focus:dark:text-orange-500 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Password
        </label>
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
          dark:focus:border-orange-500 focus:outline-none focus:ring-0 
          focus:border-orange-600 peer"
          placeholder=" "
          disabled={isPending}
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 
          dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
          -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
          peer-focus:dark:text-orange-500 
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
        bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none 
        focus:ring-orange-300 font-medium rounded-lg text-sm 
        dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 
        disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  </div>
);
}
