import { createBrowserRouter } from "react-router-dom";
import MainlayOut from "../layout/MainlayOut";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Scret from "../shared/Scret";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivetRoute";
import Payment from "../components/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainlayOut></MainlayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/add",
        element: <Register />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
