import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Artwork {
  image: string;
}

function SinglePage() {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const { id } = useParams();

  useEffect(() => {
        axios.get(`http://localhost:5555/artwork/${id}`).then((response) => {
          if(response.status === 200){
            setArtwork(response.data);
          }
        })
  }, [id]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={`http://localhost:5555/${artwork.image}`}
        alt="Artwork"
        className="h-40 w-40"
      />
    </div>
  );
}

export default SinglePage;
