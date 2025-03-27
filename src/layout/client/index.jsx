// Client layout
import { Outlet } from "react-router-dom";
import ClientHeader from "../../components/client/Header";
import ClientFooter from "../../components/client/Footer";

const ClientLayout = () => {
    return (
        <>
            <ClientHeader />
            <Outlet />
            <ClientFooter />
        </>
    )
}

export default ClientLayout;