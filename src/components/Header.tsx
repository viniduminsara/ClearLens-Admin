import Logo from "/logo.png"
import {HiOutlineMenuAlt2} from "react-icons/hi";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('accessToken');
        navigate('/signin');
    }

    return (
        <div className="navbar bg-base-100 shadow-md lg:px-8 px-4">
            <div className="flex-none">
                <label htmlFor="my-drawer-2" className="btn btn-ghost mr-2 lg:hidden">
                    <HiOutlineMenuAlt2 size={24}/>
                </label>
            </div>
            <div className="flex-1">
                <a href='/'><img src={Logo} alt="logo" className='w-28'/></a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                   <div className='btn btn-error btn-sm btn-outline' onClick={logout}>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default Header;
