import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Header from "../../components/Header/index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Artwork {
  _id: string;
  title: string;
  description: string;
  dateTime: string;
  image: string;
}

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchArtworks() {
      axios
        .get("http://localhost:5555/artwork/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const shuffledArtworks = shuffleArray(response.data.data);
          setArtworks(shuffledArtworks);
        }).catch((error) => {
            if(error.response){
                toast.error(error.response.data)
            }
        })
    }
    fetchArtworks();
  }, [token, navigate]);
  //Shuffle Array link https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return (
    <>
      <div className="App">
        <Header />
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry gutter="10px">
            {artworks.map((artwork) => (
              <div key={artwork._id}>
                <Link to={`/${artwork._id}`}>
                  <img
                    src={`http://localhost:5555/${artwork.image}`}
                    alt={artwork.title}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Link>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default HomePage;
