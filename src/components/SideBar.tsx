import { Link, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { BsStack } from "react-icons/bs";
import {FaCartShopping} from "react-icons/fa6";

const SideBar = () => {
    const location = useLocation();

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-64 gap-2 p-4">
                <li>
                    <Link
                        to="/"
                        className={`flex items-center p-3 rounded-lg transition-all ${
                            location.pathname === "/"
                                ? "text-primary"
                                : ""
                        } focus:text-primary active:text-primary`}
                    >
                        <RiDashboardFill className="mr-3" size={28}/>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products"
                        className={`flex items-center p-3 rounded-lg transition-all ${
                            location.pathname === "/products"
                                ? "text-primary"
                                : ""
                        } focus:text-primary active:text-primary`}
                    >
                        <BsStack className="mr-3" size={24}/>
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/orders"
                        className={`flex items-center p-3 rounded-lg transition-all ${
                            location.pathname === "/orders"
                                ? "text-primary"
                                : ""
                        } focus:text-primary active:text-primary`}
                    >
                        <FaCartShopping  className="mr-3" size={24}/>
                        Orders
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
