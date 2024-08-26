import useFetchSingle from '../hooks/useFetchSingle'

const ArtSingleComponents = () => {
    const {artwork} = useFetchSingle();
  return (
    <div>
      <img
        src={`https://drive.google.com/thumbnail?id=${artwork?.image}&sz=s4000`}
        alt="Artwork"
        className="h-40 w-40"
      />
    </div>
  )
}

export default ArtSingleComponents