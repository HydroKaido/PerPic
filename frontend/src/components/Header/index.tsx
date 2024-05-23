import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../LogoutModal";

export const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        setShowModal(false);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <>
            <div className="bg-white mb-3 sticky top-0 shadow-lg py-3">
                <div className="flex justify-between">
                    <div className="flex justify-between ms-3 items-center">
                        <h2>Logo</h2>
                        <h2 className="ms-3">
                            <Link to={'/'}>Home</Link>
                        </h2>
                        <div className="ms-3">
                            <Link to={'/h/create'}>Create</Link>
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="rounded-full w-70 px-4 md:w-96 md:px-8 py-1 focus:outline-none bg-gray-100"
                            placeholder="Search"
                            required
                        />
                    </div>
                    {token ? (
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" onClick={toggleProfile}>
                            <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                        </div>
                    ) : (
                        <div className="me-3 flex items-center">
                            <Link to={'/login'} className="border-2 rounded-full px-3 border-gray-500">Login</Link>
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <LogoutModal onClose={() => setShowModal(false)} handleLogout={handleLogout} />
            )}
            {showProfile && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                    <div className="me-3 flex items-center">
                            <Link to={'/dashboard'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Dashboard</Link>
                        </div>
                    <button onClick={() => setShowModal(true)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default Header;
