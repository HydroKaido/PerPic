import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Header from "../../components/Header/index";
import { Link } from "react-router-dom";

const HomePage = () => {
    const items = Array.from({ length: 100 }).map((_, index) => (
        <img
          key={index}
          src={`https://picsum.photos/200/${Math.floor(
            Math.random() * (300 - 200 + 1) + 200
          )}`}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      ));
    return ( 
        <>

            <div className="App">
            <Header/>
            <Link to={'/artwork/create'}>adfasdfdsf</Link>
                <ResponsiveMasonry columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}>
                    <Masonry gutter="10px">{items}</Masonry>
                </ResponsiveMasonry>
            </div>
        </>
     );
}
 
export default HomePage;