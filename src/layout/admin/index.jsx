// Admin layout

import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/Sidebar";

const AdminLayout = () => {
    return (
        <>
            <AdminSidebar/>
            <Outlet />
        </>
    )
}

export default AdminLayout;