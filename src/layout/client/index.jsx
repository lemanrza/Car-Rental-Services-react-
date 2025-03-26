// Client layout
import { Outlet } from "react-router-dom";
import ClientHeader from "../../components/client/Header";

const ClientLayout = () => {
    return (
        <>
            <ClientHeader />
            <Outlet />
        </>
    )
}

export default ClientLayout;