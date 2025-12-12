import { createBrowserRouter, Navigate } from "react-router";
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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Stripe from "../Pages/Stripe/Stripe";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import UserProfile from "../Pages/UserProfile/UserProfile";
import UserOrders from "../Pages/UserOrders/UserOrders";
import UserTrackOrder from "../Pages/UserTrackOrder/UserTrackOrder";
import UserRoute from "../Providers/UserRoute/UserRoute";
import ManagerRoute from "../Providers/ManagerRoute/ManagerRoute";
import ManageProducts from "../Pages/ManageProducts/ManageProducts";
import PendingOrders from "../Pages/PendingOrders/PendingOrders";
import ApprovedOrders from "../Pages/ApprovedOrders/ApprovedOrders";
import AddProduct from "../Pages/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/products",
        Component: Products
      },
      {
        path: "/login",
        element: <PublicRoute>
          <Login></Login>
        </PublicRoute>
      },
      {
        path: "/register",
        element: <PublicRoute>
          <Register></Register>
        </PublicRoute>
      },
      {
        path: "/about",
        element: <PublicRoute>
          <About></About>
        </PublicRoute>
      },
      {
        path: "/contact",
        element: <PublicRoute>
          <Contact></Contact>
        </PublicRoute>
      },
      {
        path: "/products/:id",
        element: <PrivateRoute>
          <ProductDetails></ProductDetails>
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`)
      },
      {

      },
      {
        path: "/payment",
        element: <PrivateRoute>
          <Stripe></Stripe>
        </PrivateRoute>
      },
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children:[
      {
        index:true,
         element: <Navigate to="/dashboard/profile" />
      },
      {
        path:"/dashboard/profile",
        element:<UserProfile></UserProfile>
      },
      {
        path:"/dashboard/my-orders",
        element:<UserRoute>
          <UserOrders></UserOrders>
        </UserRoute>
      },
      {
        path:"/dashboard/track-order/:id",
        element:<UserRoute>
          <UserTrackOrder></UserTrackOrder>
        </UserRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/orders/${params.id}`)
      },
      {
        path:"/dashboard/manage-products",
        element:<ManagerRoute>
          <ManageProducts></ManageProducts>
        </ManagerRoute>
      },
      {
        path:"/dashboard/pending-orders",
        element:<ManagerRoute>
          <PendingOrders></PendingOrders>
        </ManagerRoute>
      },
      {
        path:"/dashboard/approved-orders",
        element:<ManagerRoute>
          <ApprovedOrders></ApprovedOrders>
        </ManagerRoute>
      },
      {
        path:"/dashboard/add-product",
        element:<ManagerRoute>
          <AddProduct></AddProduct>
        </ManagerRoute>
      },
    ]
  }
]);

export default router;