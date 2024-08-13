import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            const storedEmail = localStorage.getItem("token");
            setEmail(storedEmail);
        }
    }, [token, navigate]);
    return ( 
        <div>
            <h1>Dashboard</h1>
            {email && <p>Welcome, {email}!</p>}
            <div>Dashboard content</div>
        </div>
    );
}

export default Dashboard;
