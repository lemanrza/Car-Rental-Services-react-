// Admin layout

import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/Header";

const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <Outlet />
        </>
    )
}

export default AdminLayout;