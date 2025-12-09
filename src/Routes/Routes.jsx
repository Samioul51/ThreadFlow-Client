import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Product from "../Components/ProductCard/ProductCard";
import PrivateRoute from "../Providers/PrivateRoute";
import PublicRoute from "../Providers/PublicRoute";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Stripe from "../Pages/Stripe/Stripe";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:"/products",
          Component:Products
        },
        {
          path:"/login",
          element:<PublicRoute>
            <Login></Login>
          </PublicRoute>
        },
        {
          path:"/register",
          element:<PublicRoute>
            <Register></Register>
          </PublicRoute>
        },
        {
          path:"/about",
          Component:About
        },
        {
          path:"/contact",
          Component:Contact
        },
        {
          path:"/products/:id",
          element:<PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>,
          loader: ({params})=>fetch(`http://localhost:3000/products/${params.id}`)
        },
        {
          path:"/dashboard",
          element:<PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        },
        {
          path:"/payment",
          element:<PrivateRoute>
            <Stripe></Stripe>
          </PrivateRoute>
        },
        {
          path:"*",
          Component:ErrorPage
        }
    ]
  },
]);

export default router;