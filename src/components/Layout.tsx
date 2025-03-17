import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import SideBar from "./SideBar.tsx";
import Footer from "./Footer.tsx";

const Layout = () => {

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
