import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import NavBar from "../components/NavBar";



const AdminLayout = () => {
  return (
    <div className="">
      <main className="grid sm:grid-cols-[30%_60%] min-h-[40vh] py-10 gap-[5%] mt-10 justify-self-center w-[95%]  relative overflow-x-hidden">
        <AdminSideBar />
        <Outlet />
      </main>

      
    </div>
  );
}

export default AdminLayout

