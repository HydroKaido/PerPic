import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../api/Api";

interface Artwork {
  _id: string;
  title: string;
  description: string;
  dateTime: string;
  image: string;
}

export const useFetchArtworks = (token: string | null) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!token) return;
    const fetchArtworks = async () => {
      try {
        const response = await api.get("/artwork/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const shuffledArtworks = shuffleArray(response.data.data);
        setArtworks(shuffledArtworks);
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data);
          toast.error(error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [token]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return { artworks, loading, error };
};
