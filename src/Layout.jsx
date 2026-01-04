import { Outlet } from "react-router-dom";
import Nav from "./navbar/Nav";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="bg-background-dark min-h-screen">
      <Nav/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
