import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const HomeLayout = () => {
    return (
      <div>
        <Header></Header>
          <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
};

export default HomeLayout;