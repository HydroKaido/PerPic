
const Header = () => {
    return ( 
        <>
        <div className="bg-white flex justify-between mx mb-3">
            <div className="flex justify-between ms-3 items-center">
                <h2>
                    Logo
                </h2>
                <h2 className="ms-3">
                    Home
                </h2>
            </div>
            <div>
                <input type="text"  className="rounded-full md:w-96 md:px-8 py-1 focus:outline-none bg-gray-100" placeholder="Search" required/>
            </div>
            <div className="me-3 flex items-center">
                <button>ajsdgsdgf</button>
            </div>
        </div>
        </>
     );
}
 
export default Header;