import { Link } from "react-router-dom";

const LoginPage = () => {
    return ( 
        <>
        <div className="h-full w-full bg-slate-200/85">
            <div className=" h-[100vh] flex justify-center items-center">
                <div className="bg-white/90 rounded shadow-lg">
                    <div className="w-96 h-64 flex justify-center items-center flex-col">
                        <h2>Login</h2>
                        <h2 >Username</h2>
                        <input type="text" className="border-2"/>
                        <h2>Password</h2>
                        <input type="text" className="border-2"/>
                        <div className="mt-10">
                            <Link to={'/register'}>Dont have an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
     );
}
<>
</>
 
export default LoginPage;