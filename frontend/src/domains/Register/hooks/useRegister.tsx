import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/Api";


interface Register {
  username: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const [register, setRegister] = useState<Register>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api
      .post("http://localhost:5555/register", register)
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
          setLoading(false);
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          setError(error.response.data.error);
        }
      });
  };

  return {register, loading, error, handleRegister, handleRegisterSubmit}
};
