import api from '../../../api/Api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Artwork {
    image: string;
  }

const useFetchSingle = () => {
    const [artwork, setArtwork] = useState<Artwork>();
    const { id } = useParams();

    useEffect(() => {
        api.get(`/artwork/${id}`).then((response) => {
            if(response.status === 200){
              setArtwork(response.data);
            }
          })
    }, [id]);

    return {artwork}
}

export default useFetchSingle