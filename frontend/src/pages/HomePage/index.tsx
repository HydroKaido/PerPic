import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Header from "../../components/Header/index";
import { Link } from "react-router-dom";
import axios from "axios";

interface Artwork {
    _id: string;
    title: string;
    description: string;
    dateTime: string;
    image: string;
}

const HomePage = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        async function fetchArtworks() {
            try {
                const response = await axios.get<{ data: Artwork[] }>("https://per-pic.vercel.app/artwork");
                setArtworks(response.data.data);
            } catch (error) {
                console.error("Error fetching artworks:", error);
            }
        }

        fetchArtworks();
    }, []);
    
    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledArtworks = shuffleArray(artworks);
    
    const items = shuffledArtworks.map((artwork) => (
        <div key={artwork._id}>
            <img
                src={`http://localhost:5555/${artwork.image}`}
                alt={artwork.title}
                style={{ width: "100%", borderRadius: "8px" }}
            />
        </div>
    ));

    return (
        <>
            <div className="App">
                <Header />
                <Link to={"/artwork/create"}>Add Artwork</Link>
                <ResponsiveMasonry columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}>
                    <Masonry gutter="10px">{items}</Masonry>
                </ResponsiveMasonry>
            </div>
        </>
    );
};

export default HomePage;
