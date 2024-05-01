import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

interface Artwork {
  _id: string;
  title: string;
  description: string;
  dateTime: string;
}

function App() {
  const [data, setData] = useState<Artwork[]>([]);
  
  useEffect(() => {
    axios
      .get<{ data: Artwork[] }>("http://localhost:5555/artwork")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        {data.map((artwork) => (
          <div key={artwork._id}>
            <h2>{artwork.title}</h2>
            <p>{artwork.description}</p>
            <p>{artwork.dateTime}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
