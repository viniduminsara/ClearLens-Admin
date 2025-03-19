const Footer = () => {
    return (
        <footer className="footer flex flex-col items-center bg-neutral text-base-content p-4 text-center md:text-left">
            <aside>
                <p className="text-xs md:text-base">Copyright © {new Date().getFullYear()} - All rights reserved by ClearLens</p>
            </aside>
        </footer>
    );
};

export default Footer;

