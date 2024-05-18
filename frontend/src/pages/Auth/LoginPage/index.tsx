import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';

interface Login {
    email: string;
    password: string;
}

const LoginPage = () => {
    const[login, setLogin] = useState<Login>({email: "",password: ""});
    const navigate = useNavigate();

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5555/login", login);
            
            if(response.data.error){
                alert(response.data.error);
            }else{
                navigate('/');
                toast.success("Login Successfully")
                localStorage.setItem("token", response.data.token);
            }
            
        } catch (error) {
            if (axios.isAxiosError(error)){
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.error);
                } else {
                    console.error(error);
                    toast.error("An unexpected error occurred");
                }
                
            }
        }
    }
    return ( 
        <>
        <div className="h-full w-full bg-slate-200/85">

            <div className=" h-[100vh] flex justify-center items-center">
                <div className="bg-white/90 rounded shadow-lg">
                <form action="" onSubmit={handleSubmit}>
                    <div className="w-96 h-64 flex justify-center items-center flex-col">
                        <h2>Login</h2>
                        <h2 >Email</h2>
                        <input type="text" name="email"  className="border-2" onChange={handleLogin}/>
                        <h2>Password</h2>
                        <input type="text" name="password"  className="border-2" onChange={handleLogin}/>
                        <button type="submit">Submit</button>
                        <div className="mt-10">
                            <Link to={'/register'}>Dont have an account</Link>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
     );
}
<>
</>
 
export default LoginPage;