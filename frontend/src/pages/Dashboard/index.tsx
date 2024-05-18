import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);


    return ( 
        <div>
            Dashboard content
        </div>
    );
}

export default Dashboard;
