import { Outlet } from "react-router-dom";
import NavbarComp from "./NavbarComp";

function Layout() {
  return (
    <>
      <NavbarComp />
      
      <Outlet />
    </>
  );
}

export default Layout;
