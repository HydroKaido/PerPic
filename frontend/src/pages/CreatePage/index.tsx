import { useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate } from "react-router-dom";
import { FormEvent } from 'react';

const MyForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDatetime] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const generateRandomName = (originalName: string) => {
        const randomString = Date.now() + "_" + Math.random().toString(36).substring(2, 8);
        const extension = originalName.split('.').pop();
        return `${randomString}.${extension}`;
    };
    const handleSaveDiary = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dateTime", dateTime);
        if (image) {
            const randomImageName = generateRandomName(image.name);
            formData.append("image", image, randomImageName);
        }
        setLoading(true);
        try {
            await axios.post("https://per-pic-api.vercel.app/artwork", formData);
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
                    <Spinner/>
                ) : (
                    <form onSubmit={handleSaveDiary}>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='border'/>
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className='border'/>
                        <input type="text" name="dateTime" value={dateTime} onChange={(e) => setDatetime(e.target.value)} className='border'/>
                        <input type="file" accept="image/*" onChange={handleImageChange} className='border' required/>
                        <button type="submit">Submit</button>
                    </form>
                )
            }
        </div>
    );
};

export default MyForm;
