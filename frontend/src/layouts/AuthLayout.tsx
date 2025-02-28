import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const AuthLayout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
