import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Artwork {
  image: string;
}

function SinglePage() {
  const [artworks, setArtworks] = useState<Artwork | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchArtwork() {
      try {
        const res = await axios.get(`http://localhost:5555/artwork/${id}`);
        setArtworks(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      fetchArtwork();
    }
  }, [id]);

  if (!artworks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={`http://localhost:5555/${artworks.image}`}
        alt=""
        className="h-40 w-40"
      />
    </div>
  );
}

export default SinglePage;
