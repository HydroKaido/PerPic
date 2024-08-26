import { lazy, Suspense } from "react";
import { useFetchArtworks } from "../hooks/useFetchArtworks";
import ArtworkGallery from "../components/ArtGalleryComponents";

const Header = lazy(() => import("../../../components/Header/index"));

const ArtGalleryPage = () => {
  const token = localStorage.getItem("token");
  const { artworks, loading, error } = useFetchArtworks(token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <ArtworkGallery artworks={artworks} />
    </div>
  );
};

export default ArtGalleryPage;
