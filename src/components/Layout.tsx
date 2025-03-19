import Header from "./Header.tsx";
import {Navigate, Outlet} from "react-router-dom";
import SideBar from "./SideBar.tsx";
import Footer from "./Footer.tsx";
import {jwtDecode} from "jwt-decode";

const Layout = () => {

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        try {
            const decodedToken: any = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime || decodedToken.role !== "ADMIN") {
                localStorage.removeItem("token");
                return <Navigate to="/signin" replace />;
            }

        } catch (error) {
            console.error("Invalid token", error);
            return <Navigate to="/signin" replace />;
        }
    } else {
        return <Navigate to="/signin" replace />
    }

    return (
        <>
            <Header />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    <main>
                        <Outlet/>
                        <Footer/>
                    </main>
                </div>
                <SideBar/>
            </div>
        </>
    )
}

export default Layout;
