import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";

interface Register{
    username: string,
    email: string,
    password: string,
}


const Signup = () => {
    
    const [register, setRegister] = useState<Register>({
        username: "",
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    

    const handleRegister  = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister(prev  => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5555/register", register);
            setLoading(false);
            navigate('/');
        }catch(err){
            setLoading(false);
            console.log(err)
        }
        console.log(register);
    }
    return ( <>

    {
        loading ? (<Spinner/>) : (
            <div className="h-full w-full bg-slate-200/85">
            <div className=" h-[100vh] flex justify-center items-center">
                <div className="bg-white/90 rounded shadow-lg">
                <form action=""  onSubmit={handleSubmit}>
                    <div className="w-96 h-64 flex justify-center items-center flex-col">
                        <h2>Register</h2>
                        <h2 >Username</h2>
                        <input type="text" name="username" className="border-2" value={register.username} onChange={handleRegister}/>
                        <h2>Email</h2>
                        <input type="text" name="email" className="border-2" value={register.email} onChange={handleRegister}/>
                        <h2>Password</h2>
                        <input type="text" name="password" className="border-2" value={register.password} onChange={handleRegister}/>
                        <button type="submit">Submit</button>
                        
                    </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
        
    </> );
}
 
export default Signup;