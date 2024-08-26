import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useCreateGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDatetime] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleSaveDiary = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateTime", dateTime);
    if (image) {
      formData.append("file", image);
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5555/artwork/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert("An error happened. Please check your inputs and try again.");
      console.error(error);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dateTime,
    setDatetime,
    image,
    setImage,
    loading,
    handleSaveDiary,}
};

export default useCreateGallery;
