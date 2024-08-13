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
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buttonValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setIsButtonDisabled(value.length < 8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/login", login);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        toast.success("Login Successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error)
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-[#EEEEEE]">
        <div className="max-w-md w-full space-y-8">
          <h2 className='text-center text-[#0039FF] text-4xl font-black'>PerPic</h2>
          <div className='bg-white px-10 py-10 rounded border shadow-lg'>
            <form action="" onSubmit={handleSubmit}>
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
                  onChange={(e) => {
                    handleLogin(e);
                    buttonValidation(e);
                  }}
                />
              </div>
              <div className='mb-4'>
                <button
                  type="submit"
                  className={`text-white bg-[#0059ff] w-full py-3 rounded font-bold ${isButtonDisabled && 'opacity-50 cursor-not-allowed'}`}
                  disabled={isButtonDisabled}
                >
                  Login
                </button>
              </div>
              {password.length > 0 && password.length < 8 && <h2 className="text-red-500 text-center bg-gray-200/70 rounded py-3 px-2 text-sm">Password must be at least 8 characters long</h2>}
              {error && <h2 className="text-red-500 text-center bg-gray-200/70 rounded py-3 px-2 text-sm">{error}</h2>}
              <div className="mt-10 text-center">
                <Link to={"/register"} className="text-gray-500">Don't have an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
