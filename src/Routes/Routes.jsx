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
import AdminRoute from "../Providers/AdminRoute/AdminRoute";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import AdminAllProducts from "../Pages/AdminAllProducts/AdminAllProducts";
import AdminAllOrders from "../Pages/AdminAllOrders/AdminAllOrders";
import AdminTrackOrder from "../Pages/AdminTrackOrder/AdminTrackOrder";
import { getAuth } from "firebase/auth";
import { authReady } from "../Providers/authReady/authReady";
import ProfileDashboard from "../Pages/Dashboard/ProfileDashboard";

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
        Component:About
      },
      {
        path: "/contact",
        Component:Contact
      },
      {
        path: "/products/:id",
        Component:ProductDetails,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_URL}/products/${params.id}`)
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
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/my-dashboard" />
      },
      {
        path:"/dashboard/my-dashboard",
        element:<ProfileDashboard></ProfileDashboard>
      },
      {
        path: "/dashboard/profile",
        element: <UserProfile></UserProfile>
      },
      {
        path: "/dashboard/my-orders",
        element: <UserRoute>
          <UserOrders></UserOrders>
        </UserRoute>
      },
      {
        path: "/dashboard/track-order/:id",
        element: <UserRoute>
          <UserTrackOrder></UserTrackOrder>
        </UserRoute>,
        loader: async ({ params }) => {
          const user = await authReady();

          if (!user)
            throw new Response("Unauthorized", { status: 401 });

          const token = await user.getIdToken();

          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/${params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!res.ok)
            throw new Response("Failed to load order!")

          return res.json();
        }
      },
      {
        path: "/dashboard/manage-products",
        element: <ManagerRoute>
          <ManageProducts></ManageProducts>
        </ManagerRoute>
      },
      {
        path: "/dashboard/pending-orders",
        element: <ManagerRoute>
          <PendingOrders></PendingOrders>
        </ManagerRoute>
      },
      {
        path: "/dashboard/approved-orders",
        element: <ManagerRoute>
          <ApprovedOrders></ApprovedOrders>
        </ManagerRoute>
      },
      {
        path: "/dashboard/add-product",
        element: <ManagerRoute>
          <AddProduct></AddProduct>
        </ManagerRoute>
      },
      {
        path: "/dashboard/manage-users",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "/dashboard/all-products",
        element: <AdminRoute>
          <AdminAllProducts></AdminAllProducts>
        </AdminRoute>
      },
      {
        path: "/dashboard/all-orders",
        element: <AdminRoute>
          <AdminAllOrders></AdminAllOrders>
        </AdminRoute>
      },
      {
        path: "/dashboard/all-orders/:id",
        element: <AdminRoute>
          <AdminTrackOrder></AdminTrackOrder>
        </AdminRoute>,
        loader: async ({ params }) => {
          const user = await authReady();

          if (!user)
            throw new Response("Unauthorized", { status: 401 });

          const token = await user.getIdToken();

          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/${params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!res.ok)
            throw new Response("Failed to load order!")

          return res.json();
        }
      }
    ]
  }
]);

export default router;