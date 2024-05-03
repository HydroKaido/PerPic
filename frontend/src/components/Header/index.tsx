import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [modal, setModal] = useState(false);

    const  openModal = () => {
        if (!modal){
            setModal(true);
        }
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
                <div onClick={openModal}>
                    <input type="text"  className="rounded-full w-70 px-4 md:w-96 md:px-8 py-1 focus:outline-none bg-gray-100" placeholder="Search" required/>
                    <div onClick={() => setModal(!modal)}>
                        EX
                    </div>
                </div>
                <div className="me-3 flex items-center">
                    <Link to={'/login'} className="border-2 rounded-full px-3 border-gray-500">Login</Link>
                </div>
            </div>
            {modal && 
            <div>
                adfadfddfa
            </div>

            }
        </div>
        </>
     );
}
 
export default Header;