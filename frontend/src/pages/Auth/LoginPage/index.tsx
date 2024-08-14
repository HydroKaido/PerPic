import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

interface Login {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5555/login', login).then((response) => {
      if(response.status === 200){
        localStorage.setItem("token", response.data.token)
        navigate('/');
        toast.success('You are now login')
      }
    }).catch((error) => {
      if(error.response)
        setError(error.response.data.error)
    })
   
  };
      

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-[#EEEEEE]">
        <div className="max-w-md w-full space-y-8">
          <h2 className='text-center text-[#0039FF] text-4xl font-black'>PerPic</h2>
          <div className='bg-white px-10 py-10 rounded border shadow-lg'>
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h2 className='font-bold mb-1'>Name</h2>
                <input
                  type="text"
                  name="email"
                  placeholder="username or email"
                  className='border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
                  onChange={handleLogin}
                />
                <h2 className='font-bold mb-1'>Password</h2>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className='border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
                  onChange={handleLogin}
                />
              </div>
              {(!login.password ||
                      (login.password.length < 8 && (
                        <div>
                          Password must be at least 8 characters long
                        </div>) ||
                        (error)
                      )) || (error)}
              <div className='mb-4'>
                <button
                  type="submit"
                  className={`text-white bg-[#0059ff] w-full py-3 rounded font-bold`}
                >
                  Login
                </button>
              </div>
              
              <div className="mt-10 text-center">
                <Link to={"/register"} className="text-gray-500">Don't have an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
