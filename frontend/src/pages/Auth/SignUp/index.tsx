import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";

interface Register {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [register, setRegister] = useState<Register>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5555/register",
        register
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setLoading(false);
        navigate("/login");
        toast.success("Wow so easy!");
      }
    } catch (error) {
      setLoading(false);
      //StockOverflow link error (fix) https://stackoverflow.com/questions/74882077/react-native-expo-how-to-see-axios-error-full-message
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
      throw new Error("Request failed");
    }
    console.log(register);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen flex items-center justify-center bg-[#EEEEEE]">
          <div className="max-w-md w-full space-y-8">
            <h2 className="text-center text-[#0039FF] text-4xl font-black">
              PerPic
            </h2>

            <div className="bg-white px-10 py-10 rounded border shadow-lg">
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="font-bold mb-1">Username</h2>
                  <input
                    type="text"
                    name="username"
                    className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    value={register.username}
                    onChange={handleRegister}
                  />
                  <h2 className="font-bold mb-1">Email</h2>
                  <input
                    type="gmail"
                    name="email"
                    className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    value={register.email}
                    onChange={handleRegister}
                  />
                  <h2 className="font-bold mb-1">Password</h2>
                  <input
                    type="password"
                    name="password"
                    className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    value={register.password}
                    onChange={handleRegister}
                  />
                </div>
                <button
                  type="submit"
                  className={`text-white bg-[#0059ff] w-full py-3 rounded font-bold `}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
