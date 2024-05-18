import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../LogoutModal";


export const Header = () => {
    const [showModal, setModal] = useState(false);
    const navigate = useNavigate()

    const token = localStorage.getItem("token");
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        setModal(false)
    }

    return ( 
        <>
        <div className="bg-white mb-3 sticky top-0 shadow-lg py-3">
            <div className="flex justify-between">
                <div className="flex justify-between ms-3 items-center">
                    <h2>
                        Logo
                    </h2>
                    <h2 className="ms-3">
                        Home
                    </h2>
                </div>
                <div >
                    <input type="text"  className="rounded-full w-70 px-4 md:w-96 md:px-8 py-1 focus:outline-none bg-gray-100" placeholder="Search" required/>
                </div>
                {token ? (
                    <div className="me-3 flex items-center">
                        <button onClick={() => setModal(true)} className="border-2 rounded-full px-3 border-gray-500">Logout</button>
                    </div>
                ) : (
                    <div className="me-3 flex items-center">
                        <Link to={'/login'} className="border-2 rounded-full px-3 border-gray-500">Login</Link>
                    </div>
                )}
                
            </div>
        </div>
        {
            showModal && <LogoutModal  onClose={() => setModal(false)} handleLogout={handleLogout}/>
        }
        </>
     );
}
 
export default Header;