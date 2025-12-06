import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

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
          Component:Login
        },
        {
          path:"/register",
          Component:Register
        },
        {
          path:"/about",
          Component:About
        },
        {
          path:"/contact",
          Component:Contact
        }
    ]
  },
]);

export default router;