// useLogin.ts
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/Api";

interface Login {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/login", login)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
          toast.success("You are now login");
        }
      })
      .catch((error) => {
        if (error.response) setError(error.response.data.error);
      });
  };

  return { login, error, handleLogin, handleLoginSubmit };
};
