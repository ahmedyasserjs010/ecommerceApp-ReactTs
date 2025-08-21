// import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from "./shared_components/Layouts/Layout.tsx";
import Home from "./Modules/User/Home/Home.tsx";
import Categories from './Modules/User/Categories/Categories.tsx';
import Cart from './Modules/User/Cart/Cart.tsx';
import Brands from './Modules/User/Brands/Brands.tsx';
import Products from './Modules/User/Products/Products.tsx';
import Wishlist from './Modules/User/Wishlist/Wishlist.tsx';

function App() {


  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {index: true, element: <Home /> },
        { path: 'categories', element: <Categories /> },
        { path: 'cart', element: <Cart /> },
        { path: 'brands', element: <Brands /> },
        { path: 'products', element: <Products /> },
        { path: 'wishlist', element: <Wishlist /> },

      ],
    },
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
