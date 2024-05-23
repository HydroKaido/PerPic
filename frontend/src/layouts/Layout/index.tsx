import Header from "../../components/Header/index";
interface Props {
    children: any;
  }

const Layout = (props: Props) => {
    return ( 
        <>
        <Header/>
        <div>{props.children}</div>
        </>
     );
}
 
export default Layout;