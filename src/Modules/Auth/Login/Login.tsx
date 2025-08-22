///ANCHOR -  Login with Spinner

import { useFormik } from 'formik';
import { LoginSchema } from '../../../services/validation';
import { useLogin } from '../../../services/Auth/Hooks/useLogin';
import { LoginPayload } from '../../../services/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SpinnersCart from '../../../shared_components/SpinnersCart/SpinnersCart';

export default function Login() {
    const { mutate, isPending } = useLogin(); // isPending gives us loading state
    const navigate = useNavigate();

    function handleSubmit(values: LoginPayload) {
        mutate(values, {
            onSuccess: (response) => {
                toast.success("Login successful! 🎉");
                navigate("/");
                // حفظ بيانات اليوزر
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                console.log(response.user);
                console.log(response.token);
            },

            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Login failed! ❌");
            }
        });
    }

    let Formik = useFormik<LoginPayload>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSubmit,
        validationSchema: LoginSchema
    });

    // Show spinner overlay during login process
    if (isPending) {
        return (
            // <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                <SpinnersCart />
        );
    }

    return (
        <div>
            <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto dark:bg-gray-900 bg-green-50 p-12 shadow-xl rounded-lg ">
                <h1 className='text-3xl font-bold mb-6 text-green-700 dark:text-green-600'>Login</h1>

                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        onBlur={Formik.handleBlur} 
                        value={Formik.values.email} 
                        onChange={Formik.handleChange} 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        placeholder=" " 
                        disabled={isPending} // Disable during loading
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {Formik.touched.email && Formik.errors.email && (
                        <div
                            className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm 
        text-red-700 bg-red-100 
        dark:text-red-300 dark:bg-red-900/40"
                        >
                            {Formik.errors.email}
                        </div>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        onBlur={Formik.handleBlur} 
                        value={Formik.values.password} 
                        onChange={Formik.handleChange} 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        placeholder=" " 
                        disabled={isPending} // Disable during loading
                    />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {Formik.touched.password && Formik.errors.password && (
                        <div className="mt-2 text-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40 px-3 py-2 rounded-md shadow-sm">
                            {Formik.errors.password}
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={isPending} // Disable button during loading
                >
                    {isPending ? 'Signing in...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}