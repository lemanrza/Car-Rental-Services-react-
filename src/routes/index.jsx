// Admin-client layouts
import AdminLayout from "../layout/admin";
import ClientLayout from "../layout/client";

// client pages
import Cars from "../pages/client/Cars";
import CarDetails from "../pages/client/CarDetails";
import Home from "../pages/client/Home";
import User from "../pages/client/User";
import Register from "../pages/client/Register";

//common
import Login from "../pages/common/Login"
import NotFound from "../pages/common/NotFound"

//admin pages
import DashBoard from "../pages/admin/DashBoard"
import UserManagement from "../pages/admin/UserManagement"
import CarManagement from "../pages/admin/CarManagement"
import RentalManagement from "../pages/admin/RentalManagement"
import EditVehicle from "../pages/admin/EditVehicle";


const ROUTES = [
    // client routes
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "cars",
                element: <Cars />
            },
            {
                path: "cars/:id",
                element: <CarDetails />
            },
            {
                path: "user",
                element: <User />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    // admin routes
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashBoard />
            },
            {
                path: "carManagement",
                element: <CarManagement />
            },
            {
                path: "carManagement/:id",
                element: <EditVehicle />
            },
            {
                path: "userManagement",
                element: <UserManagement />
            },
            {
                path: "rentalManagement",
                element: <RentalManagement />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
];
export default ROUTES;