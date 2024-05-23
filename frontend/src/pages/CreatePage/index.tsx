import { useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate } from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import Layout from '../../layouts/Layout';



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
        <Layout>
        <div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <>
                    <form onSubmit={handleSaveDiary}>
                    <div className='flex justify-between mx-10'>
                        <h2>Create Pin</h2>
                        <button type="submit" className={!image  ? 'bg-blue-500 opacity-70 px-8 py-2 rounded-full text-white ': `bg-blue-500 px-8 py-2 rounded-full text-white hover:bg-blue-700`} disabled={!image}>Submit</button>
                    </div>
                    <div className='mt-10'>
                        
                            <div className='grid md:grid-cols-2 md:space-x-10 mx-10'>
                                <div>
                                    <div {...getRootProps({ className: 'dropzone' })} className=" flex justify-center items-center border-2 px-4 h-full rounded border-dashed bg-gray-100 ">
                                        <input {...getInputProps()} />
                                        {
                                            !image ? (
                                                <>
                                                {isDragAccept && (
                                                    <div className='flex justify-center items-center'>
                                                        <p className='text-white/40'>This file is Accepted</p>
                                                    </div>
                                                )}
                                                {isDragReject && (
                                                <div className='flex justify-center items-center'>
                                                    <p className='text-white'>This is not a Image</p>
                                                </div>
                                                )}
                                                {!isDragActive && (
                                                    <div className='flex flex-col justify-center items-center my-20 mx-10'>
                                                        <p className='text-gray-500 text-center mb-4'>Choose a file or drag and drop it here</p>
                                                        <p className='text-gray-500 text-center'>We recommend using high quality .jpg files less than 20MB</p>
                                                    </div>
                                                
                                                )}
                                                </>
                                                
                                            ):(
                                                <img src={URL.createObjectURL(image)} alt="uploaded image" className="h-56 w-auto" />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label className={!image ? 'text-gray-300' : 'text-gray-700'}>Title</label>
                                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='border rounded h-10 mb-4' required disabled={!image}/>
                                    <label className={!image ? 'text-gray-300' : 'text-gray-700'}>Description</label>
                                    <textarea name="description" rows={3}  value={description} onChange={(e) => setDescription(e.target.value)} className='border rounded mb-4 resize-none' required disabled={!image}/>
                                    <label className={!image ? 'text-gray-300' : 'text-gray-700'}>Link</label>
                                    <input type="text" name="dateTime" value={dateTime} onChange={(e) => setDatetime(e.target.value)} className='border rounded h-10 mb-4' required disabled={!image}/>
                                    {/* <label className={!image ? 'text-gray-300' : 'text-gray-700'}>Tag</label>
                                    <select name="" id="" className='border rounded h-10' required disabled={!image}>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                        <option value="" className='border rounded h-10'>Artwork</option>
                                    </select> */}
                                </div>
                            </div>
                        
                    </div>
                    </form>
                    </>
                    
                )
                
            }
            
        </div>
        
        </Layout>
    );
};

export default CreatePage;
