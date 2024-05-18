
const LogoutModal = ({ onClose, handleLogout }: any) => {
    
    return ( 
        <>
         <div
            className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}
            >
                <div className="relative w-[600px] max-w-full h-[200px] bg-white rounded-xl p-4 justify-center flex flex-col " onClick={(event) => event.stopPropagation()} >
                    <h2 className="text-center text-2xl">Are You sure want to logout?</h2>
                    <div className="text-center">
                        <button onClick={handleLogout} className="bg-red-500 text-white mt-10 px-3 rounded">Logout</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default LogoutModal;