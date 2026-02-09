//ANCHOR - App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from "./shared_components/Layouts/Layout.tsx";
import Home from "./Modules/User/Home/Home.tsx";
import Categories from './Modules/User/Categories/Categories.tsx';
import Cart from './Modules/User/Cart/Cart.tsx';
import Brands from './Modules/User/Brands/Brands.tsx';
import Products from './Modules/User/Products/Products.tsx';
import Wishlist from './Modules/User/Wishlist/Wishlist.tsx';
import Login from './Modules/Auth/Login/Login.tsx';
import Signup from './Modules/Auth/Signup/Signup.tsx';
import ForgotPassword from './Modules/Auth/ForgotPassword/ForgotPassword.tsx';
import SpecialProduct from './Modules/User/Products/specialProduct.tsx';
import SpecialCategories from './Modules/User/Categories/specialCategories.tsx';
import ProtectedRoutes from './shared_components/ProtectedRoutes/ProtectedRoutes.tsx';
// import ProtectedRoutes from './shared_components/ProtectedRoutes/ProtectedRoutes.tsx';

function App() {


  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'categories', element: <Categories /> },
        { path: 'specialCategories/:category', element: <SpecialCategories /> },
        { path: 'cart', element: <Cart /> },
        { path: 'brands', element: <Brands /> },
        { path: 'products', element: <Products /> },
        { path: 'special-products/:id/:category', element: <SpecialProduct /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: 'forgot-password', element: <ForgotPassword /> },

      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
