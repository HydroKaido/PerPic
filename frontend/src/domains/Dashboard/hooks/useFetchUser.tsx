import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
}

const useFetchUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const decoded = jwtDecode<JwtPayload>(token);
      setEmail(decoded.id);
    }
  }, [token, navigate]);

  return { email };
};

export default useFetchUser;
