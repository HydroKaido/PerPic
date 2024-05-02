import Header from "../../components/Header/index";
interface Props {
    children: any;
  }

const Layout = (props: Props) => {
    return ( 
        <>
        <Header/>
        <div className="bg-black">{props.children}</div>
        </>
     );
}
 
export default Layout;