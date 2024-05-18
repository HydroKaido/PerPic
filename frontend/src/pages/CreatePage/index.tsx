import { useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate } from "react-router-dom";

const MyForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDatetime] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveDiary = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent default form submission behavior

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dateTime", dateTime);
        if (image) {
            formData.append("image", image);
        }
        setLoading(true);
        try {
            await axios.post("http://localhost:5555/artwork", formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Add authorization header if required
                }
            });
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
            alert("An error happened. Please check your inputs and try again.");
            console.log(error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={handleSaveDiary}>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='border' required />
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className='border' required />
                        <input type="text" name="dateTime" value={dateTime} onChange={(e) => setDatetime(e.target.value)} className='border' required />
                        <input type="file" accept="image/*" onChange={handleImageChange} className='border' required />
                        <button type="submit">Submit</button>
                    </form>
                )
            }
        </div>
    );
};

export default MyForm;
