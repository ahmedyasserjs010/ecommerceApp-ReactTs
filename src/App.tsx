// import { useEffect, useState } from "react";
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
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'specialCategories/:category', element: <ProtectedRoutes><SpecialCategories /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'special-products/:id/:category', element: <ProtectedRoutes><SpecialProduct /></ProtectedRoutes> },
        { path: 'wishlist', element: <ProtectedRoutes><Wishlist /></ProtectedRoutes> },
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
