import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
interface Artwork {
  _id: string;
  title: string;
  description: string;
  dateTime: string;
  image: string;
}
interface ArtworkGalleryProps {
  artworks: Artwork[];
}
const ArtworkGallery = ({ artworks } : ArtworkGalleryProps) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
      className="w-[95%] mx-auto mt-10"
    >
      <Masonry gutter="12px" >
        {artworks.map((artwork) => (
          <div key={artwork._id}>
            <Link to={`/${artwork._id}`}>
              <img
                src={`https://drive.google.com/thumbnail?id=${artwork.image}&sz=s4000`}
                alt={artwork.description || "Artwork Image"}
                className="w-full h-auto rounded"
              />
            </Link>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ArtworkGallery;
