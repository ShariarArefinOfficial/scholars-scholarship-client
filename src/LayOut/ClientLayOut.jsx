import { Outlet } from "react-router-dom";
import NavBar from "../CommonComponent/NavBar/NavBar";
import Footer from "../CommonComponent/Footer/Footer";

const ClientLayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default ClientLayOut;