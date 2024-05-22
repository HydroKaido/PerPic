import { useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate } from "react-router-dom";
import {useDropzone} from 'react-dropzone'



const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDatetime] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveDiary = async (e: React.FormEvent) => {
        e.preventDefault();

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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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
    
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);
        }
    };

    const {getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({onDrop,
        accept: {'image/*': []}
    })


    return (
        <div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={handleSaveDiary}>
                        <div>
                            
                        </div>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='border' required />
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className='border' required />
                        <input type="text" name="dateTime" value={dateTime} onChange={(e) => setDatetime(e.target.value)} className='border' required />
                        <div {...getRootProps({ className: 'dropzone' })} className="border p-4">
                            <input {...getInputProps()} />
                            {
                                !image ? (
                                    <>
                                    {isDragAccept && (<p>This file is Accepted</p>)}
                                    {isDragReject && (<p>This is not a Image</p>)}
                                    {!isDragActive && (<p>Drop some files here ...</p>)}
                                    </>
                                    
                                ):(
                                    <img src={URL.createObjectURL(image)} alt="uploaded image" className="h-40 w-auto" />
                                )
                            }
                            </div>
                        <button type="submit">Submit</button>
                    </form>
                )
            }
        </div>
    );
};

export default CreatePage;
